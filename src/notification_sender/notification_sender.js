import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config()

export const send_email = async (mail_to) => {
  const mail = process.env.NOTYFICATE_GMAIL
  const pass = process.env.NOTYFICATE_GMAIL_PASS

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: mail,
      pass: pass,
    },
  })

  let mailOptions = {
    from: mail,
    to: mail_to,
    subject: 'asd',
    text: 'University works',
  }

  transporter.sendMail(mailOptions, (err) => {
    if (err) {
      console.log(err)
      return console.log(`Error with email ${mail_to}`)
    }
    return console.log(`Notification sended to ${mail_to}`)
  })
}
