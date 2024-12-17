const mongoose = require('mongoose')

const userShema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "provide name"]
    },
    email: {
        type: String,
        required: [true, "provide email"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "provide password"]
    },
    profile_pic: {
        type: String,
        default: ""
    }
},{
    timestamps: true
})

const UserModel = mongoose.model('User', userShema)
module.exports = UserModel