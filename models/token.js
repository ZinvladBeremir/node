const mongoose = require('mongoose')
const Schema = mongoose.Schema

const tokenSchema = new Schema({
    access_token: {
        type: String,
        require: true
    },
    refresh_token: {
        type: String,
        require: true
    }
})

const Token = mongoose.model('Token', tokenSchema)

module.exports = Token
