import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
import hbs from 'nodemailer-express-handlebars'
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

  const handlebarOptions = {
    viewEngine: {
      partialsDir: './src/notification_sender/',
      defaultLayout: false,
    },
    extName: '.html',
    viewPath: './src/notification_sender/',
  }
  transporter.use('compile', hbs(handlebarOptions))

  let mailOptions = {
    from: mail,
    to: mail_to,
    subject: 'asd',
    template: 'message',
    context: {
      name: 'Adebola', // replace {{name}} with Adebola
      company: 'My Company', // replace {{company}} with My Company
    },
  }

  transporter.sendMail(mailOptions, (err) => {
    if (err) {
      console.log(err)
      return console.log(`Error with email ${mail_to}`)
    }
    return console.log(`Notification sended to ${mail_to}`)
  })
}
