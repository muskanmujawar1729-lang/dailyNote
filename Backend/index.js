import express from "express"
import dotenv, { config } from "dotenv"
import ConnectDb from "./Database/Db.js";
import userRoute from "./routes/userRouter.js";
import cors from "cors"
import cookieParser from "cookie-parser";

const app = express();
app.use(express.json())
dotenv.config()
app.use(cookieParser());

app.use(cors({
  origin: "https://daily-note-apps.netlify.app",
  credentials: true
}))


app.get("/",(req,res)=>{
  res.send("Hello Muskan");
})
app.use("/user",userRoute)

app.listen(process.env.PORT,()=>{
  ConnectDb();
  console.log(`Server is Running on ${process.env.PORT}`);
})