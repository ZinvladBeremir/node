const User = require('../models/user')
const Token = require('../models/token')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator')
const { sendEmailVerification } = require('../utils/email_verification')
require('dotenv').config()

const registration = async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            res.status(400).send({message: 'errors while registration', errors})
        } else {
            const {email, password} = req.body;
            const candidate = await User.findOne({email});

            if (!!candidate) {
                res.status(400).send({message: 'user already exist'})
            } else {
                const hashPass = bcrypt.hashSync(password, 7)
                const user = await new User({email, password: hashPass, verified: false}).save()
                const token = await new Token({token: generateAccessToken(user._id)}).save()
                await sendEmailVerification(token)
                res.status(201).send({message: 'check your mail for verification'})
            }
        }
    } catch (e) {
        res.status(400).send({message: 'registration error'})
    }
}

const verification = async (req, res) => {
    try {
        const {token} = req.params
        const decoded = jwt.verify(token, process.env.SECRET_ACCESS)
        const tokenData = await Token.findOne({token})

        if(!tokenData) {
            res.status(400).send({message: `invalid link`})
        } else {
            await User.findByIdAndUpdate(decoded.id, {verified: true})
            await tokenData.remove()
            res.status(200).send({message: 'verification successful'})
        }
    } catch (e) {
        res.status(400).send({message: 'verification error'})
    }
}


const generateAccessToken = (id) => {
    const payload = { id }
    return jwt.sign(payload, process.env.SECRET_ACCESS, {expiresIn: '24h'})
}
const login = async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if (!user) {
            res.status(400).send({message: `User ${email} not found`})
        } else {
            const validPassword = bcrypt.compareSync(password, user.password)
            if (!validPassword) {
                res.status(400).send({message: 'wrong password'})
            } else if (!user.verified) {
                res.status(400).send({message: 'user not verified'})
            } else {
                const token = generateAccessToken(user._id)
                res.status(200).send({token: `Bearer ${token}`})
            }
        }

    } catch (e) {
        res.status(400).send({message: 'login error'})
    }
}
const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.send(users)
    } catch (e) {
        res.status(400).send({message: 'getUsers error'})
    }
}

module.exports = { registration, login, getUsers, verification }
