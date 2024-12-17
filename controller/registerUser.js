const UserModel = require("../models/UserModel")
const bcrypt = require('bcryptjs')

async function  registerUser(request, response) {
    try {
        const {name, email, password, profile_pic} = request.body
        checkEmail = await UserModel.findOne({email})

        if(checkEmail){
            return response.status(400).json({
                message: "User already exist",
                error: true,
            })
        }
        // const salt = await bcrypt.genSalt(10)
        // const hashPassword = await bcrypt(password, salt)

        const payload = {
            name, email, password, profile_pic
        }
        const user = UserModel(payload)
        const userSave = await user.save()
        return response.status(201).json({
            message: "user is created successfully",
            data: userSave,
            success: true
        })

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true
        })
        
    }
    
}

module.exports = registerUser