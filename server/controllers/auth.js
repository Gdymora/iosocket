const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const keys = require('../config/keys')
const User = require('../models/user')

module.exports.login = async function (req, res) {

    const candidate = await User.findOne({ email: req.body.email })

    if (candidate) {
        // Проверка пароля, пользователь существует
        const passwordResult = bcrypt.compareSync(req.body.password, candidate.password)
        if (passwordResult) {
            // Генерация токена, пароли совпали
            const token = jwt.sign({
                login: candidate.login,
                userId: candidate._id
            }, keys.jwt, { expiresIn: 60 * 60 })

            res.status(200).json({
                access_token: `${token}`,
                user: {
                    id: candidate._id,
                    login: candidate.login,
                },
                "token_type": "bearer",
                "expires_in": 1800,
            })
        } else {
            // Пароли не совпали
            res.status(401).json({
                message: 'Пароли не совпадают. Попробуйте снова.'
            })
        }
    } else {
        // Пользователя нет, ошибка
        res.status(404).json({
            message: 'Пользователь с таким email не найден.'
        })
    }
}
module.exports.register = async function (req, res) {
    // email password
    const candidate = await User.findOne({ email: req.body.email })
    if (candidate) {
        // Пользователь существует, нужно отправить ошибку
        res.status(409).json({
            message: 'Такой email уже занят. Попробуйте другой.'
        })
    } else {
        // Нужно создать пользователя
        const salt = bcrypt.genSaltSync(10)
        const password = req.body.password

        const user = new User({
            name: req.body.name,
            login: req.body.login,
            email: req.body.email,
            password: bcrypt.hashSync(password, salt)
        })

        try {
            await user.save()
            res.status(201).json(user)
        } catch (e) {
            console.log(res, e)
        }
    }

}
