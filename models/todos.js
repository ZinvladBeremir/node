const mongoose = require('mongoose')
const Schema = mongoose.Schema

const todoSchema = new Schema({
    text: {
        type: String,
        require: true
    }
}, {timestamps: true})

const Todos = mongoose.model('Todos', todoSchema)

module.exports = Todos
