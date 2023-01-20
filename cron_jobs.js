const CronJob = require('cron').CronJob;
const Todos = require('./models/todos')
const nodemailer = require('nodemailer');
require('dotenv').config()

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS
    },
});

function getOption(arr) {
    const list = arr.map(el => `<li>${el.text}</li>`).join('')
    return {
        from: process.env.EMAIL,
        to: process.env.EMAIL_TO,
        subject: 'First email from node',
        html: `
            <h1>Hello from NODE<a/>
            <p>Here is some todo(s) which you should pass today.</p>
            <ul>${list}</ul>
        `
    }
}

// every day at 8-30
const job_send_tomorrow_todos = new CronJob('30 08 * * *', async () => {
    const tomorrow = new Date(new Date())
    const newDate = tomorrow.setDate(tomorrow.getDate() + 1)
    const nextDate = new Date(newDate).toISOString().split('T')[0]
    try {
        const list = await Todos.find({'end_date': {$regex: nextDate, $options: 'i'}},)
        transporter.sendMail(getOption(list), error => console.log(error ? 'JOB ERRORED' : 'JOB COMPLETED'))
    } catch (e) {
        console.log('some error ', e)
    }
})

module.exports = { job_send_tomorrow_todos }
