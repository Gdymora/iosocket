const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const keys = require('../config/keys')

module.exports.login = async function (req, res) {

    const profile = {
        login: 'John',
        email: 'john@doe.com',
        id: 123
    };

    // we are sending the profile in the token
    const token = jwt.sign(profile, keys.jwt, { expiresIn: 60 * 5 });
    console.log(this.token)
    res.status(200).json({
        access_token: `${token}`,
        user: {
            id: profile.id,
            login: profile.login,
        },
        "token_type": "bearer",
        "expires_in": 1800,
    })

}