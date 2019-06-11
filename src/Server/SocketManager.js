const io = require('./server.js').io

const {
    LOGIN_ATTEMPT,
    LOGIN_RESPONSE,
    REFRESH_USERS,
    INVITATION_GOT,
    INVITATION_SENT,
    INVITATION_ACCEPT,
    CHATROOM_CREATE,
    CHAT_MESSAGE,
    CHAT_LEAVE
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
            // let ip = socket.request.connection.remoteAddress
            // ip = '31.42.13.108' //! watch out, remove it later
            // iplocation(ip, [])
            //     .then(res => {
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
            // })
            // .catch(err => {
            //     response.error = 'Could not get location.'
            // })
        }
    })

    socket.on(INVITATION_SENT, ({ invitation }) => {
        let { socketId } = invitation.to
        //todo verify if players not busy
        let fromId = io.sockets.connected[invitation.from.socketId].user.id
        let toId = io.sockets.connected[invitation.to.socketId].user.id
        if (users[fromId].status === 'free') {
            if (users[toId].status === 'free') {
                socket.to(socketId).emit(INVITATION_GOT, { invitation })
            }
        }
    })

    socket.on(INVITATION_ACCEPT, ({ invitation }) => {
        let chat = createChatroom({
            from: invitation.from,
            to: invitation.to
        })

        users[chat.users.from.id].status = 'busy'
        users[chat.users.to.id].status = 'busy'
        users[chat.users.from.id].chatroomId = chat.id
        users[chat.users.to.id].chatroomId = chat.id

        io.emit(REFRESH_USERS, { users })

        io.sockets.connected[chat.users.from.socketId].join(chat.id)
        io.sockets.connected[chat.users.to.socketId].join(chat.id)
        io.in(chat.id).emit(CHATROOM_CREATE, { chat })
    })

    const getPartner = ({ user, users }) => {
        let result = Object.values(users).filter(arrUser => {
            if (arrUser.chatroomId === user.chatroomId) {
                if (arrUser.id !== user.id) return true
                return false
            }
            return false
        })
        return result.pop()
    }

    socket.on(CHAT_MESSAGE, ({ message }) => {
        socket.in(message.who.chatroomId).emit(CHAT_MESSAGE, { message })
    })

    socket.on(CHAT_LEAVE, () => {
        const user = users[socket.user.id]
        const partner = getPartner({ user, users })
        const chatId = user.chatroomId

        users[user.id].status = 'free'
        users[partner.id].status = 'free'

        users[user.id].chatroomId = null
        users[partner.id].chatroomId = null

        io.in(chatId).emit(CHAT_LEAVE, null)
        io.sockets.connected[user.socketId].leave(chatId)
        io.sockets.connected[partner.socketId].leave(chatId)
        io.emit(REFRESH_USERS, { users })
    })

    socket.on('disconnect', () => {
        if ('user' in socket) {
            const { user } = socket
            users = removeUser({ user, users })
            io.emit(REFRESH_USERS, { users })
        }
    })
}
