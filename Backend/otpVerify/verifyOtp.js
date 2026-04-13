import nodemailer from "nodemailer"
import "dotenv/config"
import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"
import handlebars from "handlebars"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename);

export const verifyMail = async(token,email)=>{
    const emailTemplate = fs.readFileSync(
        path.join(__dirname,"template.hbs"),
        "utf-8"
    )
    const template = handlebars.compile(emailTemplate)
    const htmlToSend = template({token:encodeURIComponent(token)})
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    })

    await transporter.verify()

    const mailConfigurations = {
        from: process.env.EMAIL,
        to: email,
        subject: "Email Verification",
        html: htmlToSend
    }

    const info = await transporter.sendMail(mailConfigurations)
    console.log("Email sent successfully", info.response)
    return info

}