const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    login: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
})

const User = module.exports = mongoose.model('users', userSchema)