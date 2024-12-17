const { Socket } = require('dgram')
const express = require('express')
const http = require('http')
const {Server} = require('socket.io')
const getUserDetailsFromToken = require('../helpers/getUserDetailsFromToken')
const UserModel = require('../models/UserModel')
const { ConversationModel, MessageModel } = require('../models/ConversationModel')


const app = express()

/** Socket connection */
const server = http.createServer(app)

const io = new Server(server, {
    cors:{
        origin: process.env.FRONTEND_URL,
        credentials: true
     }
})

const onlineUser = new Set()
io.on('connection', async(socket)=>{
    const token = socket.handshake.auth.token
    const user = await getUserDetailsFromToken(token)
    
    /** create a room */
    socket.join(user?._id.toString())
   
    /** create a room */
    onlineUser.add(user?._id?.toString())
    io.emit('onlineUsers',Array.from(onlineUser))
    socket.on('message-page', async (userId)=>{
        const userDetails = await UserModel.findById(userId).select('-password')
        const payload = {
            _id: userDetails._id,
            name: userDetails?.name,
            email: userDetails?.email,
            profile_pic: userDetails?.profile_pic,
            online: onlineUser.has(userId)
        }
        socket.emit('message-user',payload)
    })

    // new message received
    socket.on("new-message", async (data)=>{
        // check conversation is exist or not
        let conversation = await ConversationModel.findOne({
            "$or": [
                {sender: data?.sender, receiver: data?.receiver},
                {sender: data?.receiver, receiver: data?.sender}
            ]
        })
        // if conversation is not available
        if(!conversation){
            const createConversation = ConversationModel({
                sender: data?.sender,
                receiver : data?.receiver
            })
            conversation = await createConversation.save()   
        }
        const message = new MessageModel({
            text: data?.message,
            imageUrl: data?.imageUrl,
            videoUrl: data?.videoUrl,
            msgByUserId: data?.msgByUserId
        })
        const saveMessage = await message.save()
        const updateConversation = await ConversationModel.updateOne({_id: conversation?._id},{
            "$push": {messages: saveMessage?._id}
        })

        const getConversation = await ConversationModel.findOne({
            "$or": [
                {sender: data?.sender, receiver: data?.receiver},
                {sender: data?.receiver, receiver: data?.sender}
            ]
        }).populate('messages').sort({updateAt: -1})
        console.log("all the conversation", getConversation)
        io.to(data.sender).emit('messages', getConversation.messages )
        io.to(data.receiver).emit('messages', getConversation.messages)
    })

    socket.on('disconnect', ()=>{
        onlineUser.delete(user?._id)
        console.log(onlineUser)
    })
})

module.exports = {
    app, server
}