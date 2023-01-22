const mongoose = require('mongoose')
const Schema = mongoose.Schema

const todoSchema = new Schema({
    text: {
        type: String,
        require: true
    },
    user_id: {
        ref: 'User',
        type: Schema.Types.ObjectId
    },
    end_date: {
        type: String
    },
    isMarked: {
        type: Boolean
    }
}, {timestamps: true})

const Todos = mongoose.model('Todos', todoSchema)

module.exports = Todos
