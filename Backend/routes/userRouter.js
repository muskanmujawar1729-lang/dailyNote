import express from "express"
import { changePassword, createNote, forgetPassword, loginUser, logoutUser, register, verification, verifyOtp } from "../controller/userController.js";
import { isAuthentication } from "../middleware/isAuth.js";
import { userSchema, validateUser } from "../validators/userValidate.js";
const userRoute = express.Router();

userRoute.post("/register",validateUser(userSchema),register);
userRoute.post("/verify",verification);
userRoute.post("/login",loginUser)
userRoute.post("/logout",isAuthentication,logoutUser)
userRoute.post("/forget-pass",forgetPassword)
userRoute.post("/verify-otp/:email",verifyOtp);
userRoute.post("/changePass/:email",changePassword)

userRoute.post("/note",createNote)
export default userRoute;
