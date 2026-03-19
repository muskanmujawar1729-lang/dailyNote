import { User } from "../model/userModel.js";
import bcrypt from 'bcryptjs'
import { verifyMail } from "../otpVerify/verifyOtp.js";
import jwt from "jsonwebtoken";
import "dotenv/config"
import { Session } from "../model/sessionModel.js";
import { sendOtpMail } from "../otpVerify/sendOtpMail.js";

//Register here
export const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All Fields are required"
            });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User Already Exist"
            });
        }

        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                message: "Password Must be at least 6 Character"
            });
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            username,
            email,
            password: hashPassword
        });

        const token = jwt.sign(
            { id: newUser._id },
            process.env.SECRET_KEY,
            { expiresIn: "10m" }
        );

        verifyMail(token, email);

        newUser.token = token;
        await newUser.save();

        console.log(newUser);

        return res.status(201).json({
            success: true,
            message: "User Registered Successfully",
            newUser
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};
//email verification here

export const verification = async (req, res) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer")) {
            return res.status(400).json({
                success: false,
                message: "Authorization token is missing or invalid"
            });
        }

        const token = authHeader.split(" ")[1];
        console.log("TOKEN:", token)

        let decoded;

        try {
            decoded = jwt.verify(token, process.env.SECRET_KEY);
        } catch (err) {

            if (err.name === "TokenExpiredError") {
                return res.status(400).json({
                    success: false,
                    message: "The Registration token has expired"
                });
            }

            return res.status(400).json({
                success: false,
                message: "Token verification failed"
            });
        }

        const user = await User.findOne({ _id: decoded.id, token: token });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found or token invalid"
            });
        }

        user.token = null;
        user.isVerified = true;

        await user.save();

        return res.status(200).json({
            success: true,
            message: "Email verified successfully"
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

//login User
export const loginUser = async (req, res) => {
    try {

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User not found"
            });
        }

        const passwordCheck = await bcrypt.compare(password, user.password);

        if (!passwordCheck) {
            return res.status(401).json({
                success: false,
                message: "Incorrect Password"
            });
        }

        if (!user.isVerified) {
            return res.status(403).json({
                success: false,
                message: "Verify your account then login"
            });
        }

        // remove old sessions
        await Session.deleteMany({ userId: user._id });

        await Session.create({ userId: user._id });

        const accessToken = jwt.sign(
            { id: user._id },
            process.env.SECRET_KEY,
            { expiresIn: "10d" }
        );

        const refreshToken = jwt.sign(
            { id: user._id },
            process.env.SECRET_KEY,
            { expiresIn: "30d" }
        );

        user.isLoggedIn = true;
        await user.save();

        return res.status(200).json({
            success: true,
            message: `Welcome Back ${user.username}`,
            accessToken,
            refreshToken,
            user
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
};
//logout user
export const logoutUser = async (req, res) => {
    try {
        const userId = req.userId;

        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "User not found",
            });
        }

        await Session.deleteMany({ userId });

        await User.findByIdAndUpdate(userId, { isLoggedIn: false });

        await Note.deleteMany({ userId }); // optional (if you want to delete notes)

        res.clearCookie("token");

        return res.status(200).json({
            success: true,
            message: "Logout successfully",
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
//Forget Password here
export const forgetPassword = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found"
            });
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const expiry = new Date(Date.now() + 10 * 60 * 1000);

        user.otp = otp;
        user.otpExpiry = expiry;

        await user.save();

        await sendOtpMail(email, otp);

        return res.status(200).json({
            success: true,
            message: "OTP sent to your email"
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};
//verify otp here

export const verifyOtp = async (req, res) => {
    const { otp } = req.body;
    const email = req.params.email;

    if (!otp) {
        return res.status(400).json({
            success: false,
            message: "OTP is Required"
        })
    }
    try {
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found"
            })
        }
        if (!user.otp || !user.otpExpiry) {
            return res.status(400).json({
                success: false,
                message: "OTP not generated or already verified"
            })
        }
        if (user.otpExpiry < new Date()) {
            return res.status(400).json({
                success: false,
                message: "OTP has expired.Please request a new one"
            })
        }
        if (otp !== user.otp) {
            return res.status(400).json({
                success: false,
                message: "Invalid OTP"
            })
        }
        user.otp = null
        user.otpExpiry = null
        await user.save()

        return res.status(200).json({
            success: true,
            message: "OTP verified successfully"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })

    }
}

//change password here

export const changePassword = async (req, res) => {
    const { newPassword, confirmPassword } = req.body;
    const email = req.params.email;

    if (!newPassword || !confirmPassword) {
        return res.status(400).json({
            success: false,
            message: "All fields are required"
        });
    }

    if (newPassword !== confirmPassword) {
        return res.status(400).json({
            success: false,
            message: "Passwords do not match"
        });
    }

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found"
            });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        user.password = hashedPassword;
        await user.save();

        return res.status(200).json({
            success: true,
            message: "Password changed successfully"
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

//this code for notes 
export const createNote = async (req, res) => {
    try {

        const { name, date, subject, text } = req.body;

        if (!name || !date || !subject || !text) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        const data = {
            name,
            date,
            subject,
            text
        };

        return res.status(200).json({
            message: "Note Created Successfully",
            data: data
        });

    } catch (error) {
        return res.status(500).json({
            message: "Server Error",
            error: error.message
        });
    }
};