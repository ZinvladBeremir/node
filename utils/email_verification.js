const nodemailer = require('nodemailer');
require('dotenv').config()

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS
    },
});

function getOption(token) {
    const url = `${process.env.LOCALHOST}/api/verification/${token}`
    return {
        from: process.env.EMAIL,
        to: process.env.EMAIL_TO,
        subject: 'Verify your registration',
        html: `
            <h1>Hello from verification<a/>
            <p>Please click <a href="${url}">here</a> for confirm your account.</p>
        `
    }
}

const sendEmailVerification = async (token) => {
    try {
        transporter.sendMail(getOption(token), error => console.log(error ? 'error while sending email verification' : 'success while sending email verification'))
    } catch (e) {
        console.log('some error ', e)
    }
}

module.exports = { sendEmailVerification }
