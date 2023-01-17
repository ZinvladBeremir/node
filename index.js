const express = require('express')
const routes = require('./routes/todos.js')
const mongoose = require('mongoose')
require('dotenv').config()

const app = express()

mongoose
    .connect(process.env.MONGO_DB_CONNECTION_STRING)
    .then(() => console.log('connect db'))
    .catch(err => console.log('err', err))

app.use(express.json())
app.use(routes)

app.listen(process.env.PORT, () => {
    console.log(`Example app listening on port ${process.env.PORT}...`)
})
