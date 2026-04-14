import { User } from "../model/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";


// ================= REGISTER =================

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // ✅ Check fields
    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // ✅ Check existing user
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // ✅ Password validation
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters",
      });
    }

    // ✅ Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ Create user
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    // ❌ No token needed here (simple flow)

    // ✅ Success response (IMPORTANT - tumhare code me missing tha)
    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
      },
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= LOGIN =================

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password required",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // ❌ IMPORTANT: verification check REMOVE
    // koi bhi isVerified code nahi hona chahiye

    const token = jwt.sign(
      { id: user._id },
      process.env.SECRET_KEY,
      { expiresIn: "7d" }
    );

    return res.status(200).json({
      success: true,
      message: "Login successfully",
      accessToken: token,
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server error",
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