require('dotenv').config()
const express = require('express')
const path = require('path')
const http = require('http')
const socketio = require('socket.io')
const app = express()
const server = http.createServer(app)
const io = socketio(server)
const port = process.env.PORT || 3000
const formatMessage = require('../utils/messages')
const {userJoin, getCurrentUser, getRoomUsers} = require('../utils/users')
const botName = 'Aditi'
// static folder
app.use(express.static(path.join(__dirname, '../public')))

// run when client joins

io.on('connection', socket => {
    console.log("new connection received")

    // Listen for chat message
    socket.on('chatMessage', msg => {
        const user = getCurrentUser(socket.id)
        io.to(user.room).emit('message', formatMessage(user.username, msg)) // sending message back to client
    })

    socket.on('joinRoom', ({username, room}) => {
        console.log(`${username} joined ${room}`)
        const user = userJoin(socket.id, username, room)
        socket.join(user.room)
        
        // Welcome user
        socket.emit('message', formatMessage(botName, 'Welcome to the chat app')) // emits only to the client that connets

        // Broadcast when a user connects. Broadcast to everyone except current client
        socket.broadcast.to(user.room).emit('message', formatMessage(botName, `${user.username} has joined the chat`)); // everyone except me
        
        // send users and room info

        io.to(user.room).emit('roomUsers', {
            room: user.room,
            users: getRoomUsers(user.room)
        })
    })

    socket.on('disconnect', () => {
        const user = getCurrentUser(socket.id)
        io.to(user.room).emit('message', formatMessage(botName, `${user.username} has left the chat`)) // inform everyone
        
        // send users and room info

        io.to(user.room).emit('roomUsers', {
            room: user.room,
            users: getRoomUsers(user.room)
        })
    })
})




server.listen(port, () => {
    console.log(`Listening at ${port}`)
})