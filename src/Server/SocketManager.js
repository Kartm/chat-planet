const io = require('./server.js').io

const { CONNECTION, LOGIN_ATTEMPT, LOGIN_RESPONSE } = require('./Events')

// const { createUser } = require('./Factories')
// const { addUser } = require('./Functions')
const { isUsernameInUse, addUser } = require('./Functions').default

let users = {}

module.exports = function(socket) {
    socket.on(LOGIN_ATTEMPT, (data, callback) => {
        socket.emit(LOGIN_RESPONSE, data)
        const responseData = { error: null, data: data }
        callback({ responseData })
    })
}
