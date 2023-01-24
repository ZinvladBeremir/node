const Router = require('express').Router
const { registration, login, getUsers, verification, refresh } = require('../controllers/auth')
const { registerGithub } = require('../controllers/github')
const { sendStream, sendBuffer } = require('../controllers/video')
const { check } = require('express-validator')
const path = require('path')

require('dotenv').config()
const GitHubStrategy = require('passport-github').Strategy;
const passport = require('passport');

const router = Router()

passport.use(new GitHubStrategy({
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: `${process.env.LOCALHOST}/api/github/register`
    },
    (accessToken, refreshToken, profile, cb) => cb(null, profile)
));

router.post('/api/registration', [
    check('email', 'Is required').notEmpty(),
    check('password', 'More then 3 and less 10').isLength({min: 3, max: 10})
    ], registration)
router.get('/api/verification/:token', verification)
router.get('/api/refresh', refresh)
router.post('/api/login', login)
router.get('/api/users', getUsers)

router.get('/github-login', (req, res) => {
    res.sendFile(path.resolve('views/', 'github.html'));
});
router.get('/api/github', passport.authenticate('github'));
router.get('/api/github/register', registerGithub);


router.get('/playvideo', sendStream);
router.get('/video/buffer', sendBuffer);


module.exports = router
