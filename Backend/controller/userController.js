import { User } from "../model/userModel.js";
import bcrypt from "bcryptjs";
import { verifyMail } from "../otpVerify/verifyOtp.js";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { Session } from "../model/sessionModel.js";
import { sendOtpMail } from "../otpVerify/sendOtpMail.js";


// ================= REGISTER =================

export const register = async (req, res) => {
    try {

        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            });
        }

        const existingUser = await User.findOne({ email });

        if(existingUser){
            return res.status(400).json({
                success:false,
                message:"User already exist"
            });
        }

        if(password.length < 6){
            return res.status(400).json({
                success:false,
                message:"Password must be at least 6 characters"
            });
        }

        const hashedPassword = await bcrypt.hash(password,10);

        const newUser = await User.create({
            username,
            email,
            password:hashedPassword
        });

        const token = jwt.sign(
            { id:newUser._id },
            process.env.SECRET_KEY,
            { expiresIn:"1h" }
        );

        newUser.token = token;
        await newUser.save();

        await verifyMail(token,email); // ⭐ important

        return res.status(201).json({
            success:true,
            message:"User registered successfully"
        });

    } catch (error) {

        return res.status(500).json({
            success:false,
            message:error.message
        });

    }
};



// ================= EMAIL VERIFICATION =================

export const verification = async (req, res) => {
  try {
    const authHeader = req.headers.authorization
    if (!authHeader?.startsWith("Bearer "))
      return res.status(400).json({ message: "Token missing" })

    const token = authHeader.split(" ")[1]

    const decoded = jwt.verify(token, process.env.SECRET_KEY)

    const user = await User.findOne({ email: decoded.email, token })
    if (!user) return res.status(404).json({ message: "User not found or token invalid" })

    user.isVerified = true
    user.token = null
    await user.save()

    res.status(200).json({ message: "Email verified successfully" })

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}



// ================= LOGIN =================

export const loginUser = async (req,res)=>{
    try{

        const { email,password } = req.body;

        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            });
        }

        const user = await User.findOne({ email });

        if(!user){
            return res.status(401).json({
                success:false,
                message:"User not found"
            });
        }

        const passwordCheck = await bcrypt.compare(password,user.password);

        if(!passwordCheck){
            return res.status(401).json({
                success:false,
                message:"Incorrect password"
            });
        }

        if(!user.isVerified){
            return res.status(403).json({
                success:false,
                message:"Verify your account then login"
            });
        }

        await Session.deleteMany({ userId:user._id });

        await Session.create({ userId:user._id });

        const accessToken = jwt.sign(
            { id:user._id },
            process.env.SECRET_KEY,
            { expiresIn:"10d" }
        );

        const refreshToken = jwt.sign(
            { id:user._id },
            process.env.SECRET_KEY,
            { expiresIn:"30d" }
        );

        user.isLoggedIn = true;
        await user.save();

        return res.status(200).json({
            success:true,
            message:`Welcome back ${user.username}`,
            accessToken,
            refreshToken,
            user
        });

    }catch(error){

        return res.status(500).json({
            success:false,
            message:error.message
        });

    }
};



// ================= LOGOUT =================

export const logoutUser = async (req,res)=>{
    try{

        const userId = req.userId;

        if(!userId){
            return res.status(400).json({
                success:false,
                message:"User not found"
            });
        }

        await Session.deleteMany({ userId });

        await User.findByIdAndUpdate(userId,{
            isLoggedIn:false
        });

        return res.status(200).json({
            success:true,
            message:"Logout successfully"
        });

    }catch(error){

        return res.status(500).json({
            success:false,
            message:error.message
        });

    }
};



// ================= FORGET PASSWORD =================

export const forgetPassword = async (req,res)=>{
    try{

        const { email } = req.body;

        const user = await User.findOne({ email });

        if(!user){
            return res.status(400).json({
                success:false,
                message:"User not found"
            });
        }

        const otp = Math.floor(100000 + Math.random()*900000).toString();

        const expiry = new Date(Date.now() + 10*60*1000);

        user.otp = otp;
        user.otpExpiry = expiry;

        await user.save();

        await sendOtpMail(email,otp);

        return res.status(200).json({
            success:true,
            message:"OTP sent to your email"
        });

    }catch(error){

        return res.status(500).json({
            success:false,
            message:"Internal server error"
        });

    }
};



// ================= VERIFY OTP =================

export const verifyOtp = async (req,res)=>{

    const { otp } = req.body;
    const email = req.params.email;

    if(!otp){
        return res.status(400).json({
            success:false,
            message:"OTP is required"
        });
    }

    try{

        const user = await User.findOne({ email });

        if(!user){
            return res.status(400).json({
                success:false,
                message:"User not found"
            });
        }

        if(!user.otp || !user.otpExpiry){
            return res.status(400).json({
                success:false,
                message:"OTP not generated"
            });
        }

        if(user.otpExpiry < new Date()){
            return res.status(400).json({
                success:false,
                message:"OTP expired"
            });
        }

        if(otp !== user.otp){
            return res.status(400).json({
                success:false,
                message:"Invalid OTP"
            });
        }

        user.otp = null;
        user.otpExpiry = null;

        await user.save();

        return res.status(200).json({
            success:true,
            message:"OTP verified successfully"
        });

    }catch(error){

        return res.status(500).json({
            success:false,
            message:"Internal server error"
        });

    }

};



// ================= CHANGE PASSWORD =================

export const changePassword = async (req,res)=>{

    const { newPassword,confirmPassword } = req.body;
    const email = req.params.email;

    if(!newPassword || !confirmPassword){
        return res.status(400).json({
            success:false,
            message:"All fields required"
        });
    }

    if(newPassword !== confirmPassword){
        return res.status(400).json({
            success:false,
            message:"Passwords do not match"
        });
    }

    try{

        const user = await User.findOne({ email });

        if(!user){
            return res.status(400).json({
                success:false,
                message:"User not found"
            });
        }

        const hashedPassword = await bcrypt.hash(newPassword,10);

        user.password = hashedPassword;

        await user.save();

        return res.status(200).json({
            success:true,
            message:"Password changed successfully"
        });

    }catch(error){

        return res.status(500).json({
            success:false,
            message:"Internal server error"
        });

    }

};



// ================= CREATE NOTE =================

export const createNote = async (req,res)=>{
    try{

        const { name,date,subject,text } = req.body;

        if(!name || !date || !subject || !text){
            return res.status(400).json({
                message:"All fields required"
            });
        }

        const data = {
            name,
            date,
            subject,
            text
        };

        return res.status(200).json({
            message:"Note created successfully",
            data
        });

    }catch(error){

        return res.status(500).json({
            message:"Server error",
            error:error.message
        });

    }
};