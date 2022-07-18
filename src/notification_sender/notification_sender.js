import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
import hbs from 'nodemailer-express-handlebars'
import { PASSWORD_RECOVERY_EXPIRE_TIME } from '../modules/constants.js'
dotenv.config()

export const send_email = async (mail_to, subject, template, msgData) => {
  const mail = process.env.NOTYFICATE_GMAIL
  const pass = process.env.NOTYFICATE_GMAIL_PASS

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: mail,
      pass: pass,
    },
  })

  const handlebarOptions = {
    viewEngine: {
      partialsDir: './src/notification_sender/',
      defaultLayout: false,
    },
    extName: '.html',
    viewPath: './src/notification_sender/',
  }
  transporter.use('compile', hbs(handlebarOptions))

  if (template === 'resetPassword') msgData.expireTime = PASSWORD_RECOVERY_EXPIRE_TIME

  let mailOptions = {
    from: mail,
    to: mail_to,
    subject,
    template: `templates/${template}`,
    context: {
      data: msgData,
    },
  }

  transporter.sendMail(mailOptions, (err) => {
    if (err) {
      console.log(err)
      console.log(`Error with email ${mail_to}`)
      return
    }
    console.log(`Notification sended to ${mail_to}`)
  })
}
