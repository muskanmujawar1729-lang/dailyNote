import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import ConnectDb from "./Database/Db.js";
import userRoute from "./routes/userRouter.js";

dotenv.config();

const app = express();

// ================= MIDDLEWARE =================
app.use(express.json());
app.use(cookieParser());

// ================= CORS =================
app.use(
  cors({
    origin: "https://my-notes-apps.netlify.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// ================= TEST ROUTE =================
app.get("/", (req, res) => {
  res.send("🚀 Server is running (No Nodemailer Version)");
});

// ================= ROUTES =================
app.use("/user", userRoute);

// ================= DB + SERVER START =================
ConnectDb()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`🚀 Server running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ DB connection failed:", err);
  });