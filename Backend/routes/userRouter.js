import express from "express"
import {  createNote, loginUser, logoutUser, register } from "../controller/userController.js";
import { isAuthentication } from "../middleware/isAuth.js";
const userRoute = express.Router();

userRoute.post("/register",register);
userRoute.post("/login",loginUser)
userRoute.post("/logout",isAuthentication,logoutUser)

userRoute.post("/note",createNote)
export default userRoute;
