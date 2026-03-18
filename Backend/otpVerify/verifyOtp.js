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
        service:"gmail",
        auth:{
            user:process.env.MAIL_USER,
            pass:process.env.PASSWORD
        }
    })

    const mailConfigurations = {
        from : process.env.MAIL_USER,
        to:email,
        subject:"Email Verification",
        html:htmlToSend
    }
    transporter.sendMail(mailConfigurations,function(error,info){
        if(error){
            throw new Error(error)
        }
        console.log("Email Send Successfully");
        console.log(info);
        
        
    })

}