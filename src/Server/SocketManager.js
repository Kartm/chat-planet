const io = require('./server.js').io

const { CONNECTION } = require('./Events')

// const { createUser } = require('./Factories')
// const { addUser } = require('./Functions')

let users = {}

module.exports = function(socket) {
    socket.on('connection', socket => {
        console.log(socket)
    })

    socket.on('test', callback => {
        callback()
    })
}
