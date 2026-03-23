import express from "express";
import dotenv from "dotenv";
import ConnectDb from "./Database/Db.js";
import userRoute from "./routes/userRouter.js";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: ["https://my-notes-apps.netlify.app"],
  credentials: true
}));

app.get("/", (req, res) => {
  res.send("Hello Muskan");
});

app.use("/user", userRoute);

ConnectDb().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Server is running on ${process.env.PORT}`);
  });
}).catch(err => {
  console.error("Database connection failed:", err);
});