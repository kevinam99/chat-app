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
const botName = 'Aditi'
// static folder
app.use(express.static(path.join(__dirname, '../public')))

// run when client joins

io.on('connection', socket => {
    console.log("new connection")
    socket.emit('message', formatMessage(botName, 'Welcome to the chat app')) // emits only to the client that connets

    // Broadcast when a user connects

    socket.broadcast.emit('message', formatMessage(botName, 'A user has joined the chat')); // everyone except me
    socket.on('disconnect', () => {
        io.emit('message', formatMessage(botName, 'User has left the chat')) // inform everyone
    })

    // Listen for chat message
    socket.on('chatMessage', msg => {
        io.emit('message', formatMessage('USER', msg)) // sending message back to client
    })
})




server.listen(port, () => {
    console.log(`Listening at ${port}`)
})