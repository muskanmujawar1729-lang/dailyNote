import express from "express";
import dotenv from "dotenv";
import ConnectDb from "./Database/Db.js";
import userRoute from "./routes/userRouter.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import nodemailer from "nodemailer";

dotenv.config();

const app = express();

app.use(cors({
  origin: ["https://my-notes-apps.netlify.app", "http://localhost:5173"],
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());


app.get("/", (req, res) => {
  res.send("Hello Muskan");
});

app.get("/test-mail", async (req, res) => {
  try {
    console.log("EMAIL:", process.env.EMAIL);
    console.log("PASSWORD:", process.env.PASSWORD);

    const transporter = (await import("nodemailer")).default.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
      }
    });

    const info = await transporter.sendMail({
      from: process.env.EMAIL,
      to: process.env.EMAIL,
      subject: "Test Mail",
      text: "Mail is working"
    });

    console.log("SUCCESS:", info.response);
    res.send("Mail sent");

  } catch (error) {
    console.log("ERROR FULL:", error);
    res.send("Error sending mail");
  }
});

app.use("/user", userRoute);

ConnectDb().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Server is running on ${process.env.PORT}`);
  });
}).catch(err => {
  console.error("Database connection failed:", err);
});