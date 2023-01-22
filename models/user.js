const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    verified: {
        type: Boolean,
        require: true,
        default: false
    },
})

const User = mongoose.model('User', userSchema)

module.exports = User
