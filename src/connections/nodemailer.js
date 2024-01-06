const nodemailer = require('nodemailer')
require('dotenv').config()

const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const sendMail = (to, subject, html) => {
    transport.sendMail({
        from: `${process.env.EMAIL_NAME} <${process.env.EMAIL_FROM}>`,
        to,
        subject,
        html
    })
}

module.exports = {
    transport,
    sendMail
}
