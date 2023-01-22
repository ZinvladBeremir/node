const Router = require('express').Router
const { registration, login, getUsers, verification } = require('../controllers/auth')
const { check } = require('express-validator');

// const swaggerUi = require('swagger-ui-express');
// const swaggerDocument = require('../swagger/docs');

const router = Router()

// router.use('/swagger', swaggerUi.serve);
// router.get('/swagger', swaggerUi.setup(swaggerDocument));

router.post('/api/registration', [
    check('email', 'Is required').notEmpty(),
    check('password', 'More then 3 and less 10').isLength({min: 3, max: 10})
    ], registration)
router.get('/api/verification/:token', verification)
router.post('/api/login', login)
router.get('/api/users', getUsers)


module.exports = router
