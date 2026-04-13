import nodemailer from "nodemailer"
import "dotenv/config"

export const sendOtpMail = async (email, otp) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
      }
    });

    await transporter.verify()

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Password reset OTP",
      html: `<p>Your OTP for reset is : <b>${otp}</b>. It is valid for 10 minutes</p>`
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Mail sent:", info.response);
    return info;

  } catch (error) {
    console.log("❌ Mail error:", error.message);
    throw new Error(error.message);
  }
};