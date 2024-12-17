const mongoose = require("mongoose")

async function connectDB() {
    try{
        await mongoose.connect(process.env.MONGODB_URI)
        const connection = mongoose.connection
        connection.on('connected',()=>{
            console.log("connected to database successfully")
        })
        connection.on("error", (error)=>{
            console.log("some went wrong in mongo DB", error)
        })

    }catch(err){
        console.log("some went wrong in mongo DB", err)
    }
}
module.exports = connectDB