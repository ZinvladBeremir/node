const express = require('express')
const routesTodos = require('./routes/todos')
const routesAuth = require('./routes/auth')
const mongoose = require('mongoose')
const { checkNextDayTodosAndSendEmail } = require('./utils/mailler');
const cookieParser = require('cookie-parser')
require('dotenv').config()

mongoose
    .connect(process.env.MONGO_DB_CONNECTION_STRING)
    .then(() => console.log('connect db'))
    .catch(err => console.log('err', err))

const app = express()
app.use(cookieParser())

app.use(express.json())

app.use(routesTodos)
app.use(routesAuth)

checkNextDayTodosAndSendEmail()

app.listen(process.env.PORT, () => {
    console.log(`Example app listening on port ${process.env.PORT}...`)
})
