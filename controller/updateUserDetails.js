const getUserDetailsFromToken = require("../helpers/getUserDetailsFromToken")
const UserModel = require("../models/UserModel")

async function updateUserdetails(request, response) {
    try {
        const token = request.cookies.token || ""
        console.log("cookies ==> ", token)

        const user = await getUserDetailsFromToken(token)

        const {name, profile_pic} = request.body

        const updateUser = await UserModel.updateOne({_id: user._id},{
            name, profile_pic
        })
        const userDetail = await UserModel.findById(user._id).select("-password")
        return response.status(200).json({
            message: "user update successfully",
            data: userDetail,
            success: true
        })

    } catch (error) {
        return response.status(500).json({
            message: error.message || error
        })
        
    }
}
module.exports = updateUserdetails