const getUserDetailsFromToken = require("../helpers/getUserDetailsFromToken")

async function userDetails(request, response){
    try {
        const token = request.headers.authorization || ""
        const user = await getUserDetailsFromToken(token)
        // console.log("request header auth ==>", request.headers.authorization)
        return response.status(200).json({
            message: "User Details",
            data: user,
            success: true
        })
    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true
        })
    }
}
module.exports = userDetails