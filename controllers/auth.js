const User = require('../models/auth')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator')
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
                await new User({email, password: hashPass}).save()
                res.status(201).send({message: 'user  was created'})
            }
        }
    } catch (e) {
        res.status(400).send({message: 'registration error'})
    }
}


const generateAccessToken = (id) => {
    const payload = {
        id
    }
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

module.exports = { registration, login, getUsers }
