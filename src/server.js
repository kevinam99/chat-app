require('dotenv').config()
const express = require('express')
const path = require('path')
const http = require('http')
const socketio = require('socket.io')
const app = express()
const server = http.createServer(app)
const io = socketio(server)
const port = process.env.PORT || 3000

// static folder
app.use(express.static(path.join(__dirname, '../public')))

// run when client joins

io.on('connection', socket => {
    console.log("new connection")
})


server.listen(port, () => {
    console.log(`Listening at ${port}`)
})