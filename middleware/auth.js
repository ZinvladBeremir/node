const jwt = require('jsonwebtoken');
require('dotenv').config()

module.exports = (req, res, next) => {
    if(req.method === 'OPTIONS') {
        next()
    }

    try {
        const token = req.headers.authorization.split(' ')[1]
        if (!token) {
            res.status(400).send({message: 'User not  authorised'})
        } else {
            const decoded = jwt.verify(token, process.env.SECRET_ACCESS)
            next()
        }

    } catch (e) {
        res.status(400).send({message: 'User not  authorised'})
    }
}
