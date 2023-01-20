const express = require('express')
const routes = require('./routes/todos')
const mongoose = require('mongoose')
const { checkNextDayTodosAndSendEmail } = require('./utils/mailler');
require('dotenv').config()

mongoose
    .connect(process.env.MONGO_DB_CONNECTION_STRING)
    .then(() => console.log('connect db'))
    .catch(err => console.log('err', err))

const app = express()

app.use(express.json())
app.use(routes)

checkNextDayTodosAndSendEmail()

app.listen(process.env.PORT, () => {
    console.log(`Example app listening on port ${process.env.PORT}...`)
})
