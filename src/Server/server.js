const express = require('express')
const app = express()
const server = require('http').createServer(app)
const io = (module.exports.io = require('socket.io')(server, {
    pingInterval: 2000
}))

const port = process.env.PORT || 3231
const SocketManager = require('./SocketManager')

io.on('connection', SocketManager)

server.listen(port, () => {
    console.log(`Server started on port ${port}.`)
})
