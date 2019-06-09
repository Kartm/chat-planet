const io = require('./server.js').io

const {
    LOGIN_ATTEMPT,
    LOGIN_RESPONSE,
    REFRESH_USERS,
    INVITATION_GOT,
    INVITATION_SENT,
    INVITATION_ACCEPT,
    CHATROOM_CREATE
} = require('./Events')

const { createUser, createChatroom } = require('./Factories')
const { isNameInUse, addUser, removeUser } = require('./Functions')
const iplocation = require('iplocation').default

let users = {}

const randomPos = () => {
    let result = Math.floor(Math.random() * 30) + 10
    return result
}

module.exports = socket => {
    socket.emit(REFRESH_USERS, { users })
    socket.on(LOGIN_ATTEMPT, data => {
        const { name } = data
        let response = { user: null, error: null, users: null }

        if (isNameInUse({ name, users })) {
            response.error = 'Username in use.'
            socket.emit(LOGIN_RESPONSE, { response })
        } else {
            let ip = socket.request.connection.remoteAddress
            ip = '31.42.13.108' //! watch out, remove it later
            iplocation(ip, [])
                .then(res => {
                    const user = createUser({
                        name,
                        socketId: socket.id,
                        countryCode: 'PL',
                        latitude: randomPos(),
                        longitude: randomPos()
                        //countryCode: res.countryCode,
                        // latitude: res.latitude,
                        // longitude: res.longitude
                    })
                    users = addUser({ user, users })
                    socket.user = user
                    response.users = users
                    response.user = user
                    socket.emit(LOGIN_RESPONSE, { response })
                    socket.broadcast.emit(REFRESH_USERS, { users })
                })
                .catch(err => {
                    response.error = 'Could not get location.'
                })
        }
    })

    socket.on(INVITATION_SENT, ({ invitation }) => {
        let { socketId } = invitation.to
        socket.to(socketId).emit(INVITATION_GOT, { invitation })
    })

    socket.on(INVITATION_ACCEPT, ({ invitation }) => {
        let chat = createChatroom({
            from: invitation.from,
            to: invitation.to
        })

        //todo cleanup
        users[chat.users.from.id].status = 'busy'
        users[chat.users.to.id].status = 'busy'
        io.emit(REFRESH_USERS, { users })

        io.sockets.connected[chat.users.from.socketId].join(chat.id)
        io.sockets.connected[chat.users.to.socketId].join(chat.id)
        io.in(chat.id).emit(CHATROOM_CREATE, { chat })
    })

    socket.on('disconnect', () => {
        if ('user' in socket) {
            const { user } = socket
            users = removeUser({ user, users })
            io.emit(REFRESH_USERS, { users })
        }
    })
}
