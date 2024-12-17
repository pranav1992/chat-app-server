async function logout(request, response) {
    try {
        const cookies ={
            http: true,
            secure: true
        }
        response.cookie("token", "", cookies)
        return response.status(200).json({
            message :"session time out", 
            success: true

        })
    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true
        })
    }
}
module.exports = logout