const Router = require('express').Router
const { registration, login, getUsers, verification, refresh } = require('../controllers/auth')
const { check } = require('express-validator');

const router = Router()

router.post('/api/registration', [
    check('email', 'Is required').notEmpty(),
    check('password', 'More then 3 and less 10').isLength({min: 3, max: 10})
    ], registration)
router.get('/api/verification/:token', verification)
router.get('/api/refresh', refresh)
router.post('/api/login', login)
router.get('/api/users', getUsers)


module.exports = router
