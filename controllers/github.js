require('dotenv').config()
const axios = require('axios');

const registerGithub = async (req, res) => {
    try {
        const token = await getAccessToken(req.query.code)
        const user = await getUser(token)
        res.status(200).send(user)
    } catch (e) {
        res.status(400).send({message: 'logGithub error'})
    }
}

async function getAccessToken(code) {
    const postData = {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code
    };
    const res = await axios.post('https://github.com/login/oauth/access_token', postData)
    const params = new URLSearchParams(res.data);
    return params.get('access_token')
}

async function getUser(token) {
    const res = await axios.get('https://api.github.com/user', { headers: {Authorization: `Bearer ${token}`} })
    return res.data
}

module.exports = { registerGithub }
