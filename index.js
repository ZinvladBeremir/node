const express = require('express')
const routes = require('./routes/todo.js')
const mongoose = require('mongoose')

const db = 'mongodb+srv://root:root@cluster0.vmgqinq.mongodb.net/node?retryWrites=true&w=majority'
const app = express()
const PORT = process.env.PORT ?? 3000

mongoose
    .connect(db)
    .then(() => console.log('connect db'))
    .catch(err => console.log('err', err))

app.use(express.json())
app.use(routes)

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}...`)
})
