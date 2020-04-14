import express from 'express'
import path from 'path'
import http from 'http'
import socketio from 'socket.io'
require('dotenv').config()
const app = express()
const server = http.createServer(app)
const io = http.createServer(app)
const port = process.env.PORT || 3000

// run when client joins

io.on('connection', socket => {
    console.log("new connetion")
})

// static folder
app.use(express.static(path.join(__dirname, '../public')))
server.listen(port, () => {
    console.log(`Listening at ${port}`)
})
