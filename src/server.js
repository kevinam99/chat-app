import express from 'express'
import path from 'path'
import * as  http from 'http'
import socketio from 'socket.io'
require('dotenv').config()
const app = express()
const server = http.createServer(app)
const io = http.createServer(app)
const port = process.env.PORT || 3000

// run when client joins

io.on('connection', socket => {
    console.log("new connection")
})

// static folder
app.use(express.static(path.join(__dirname, '../public')))
console.log(path.join(__dirname, '../public'))
console.log("helloo")
server.listen(port, () => {
    console.log(`Listening at ${port}`)
})