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

const { createChatroom } = require('./Factories')
const {
    isNameInUse,
    addUser,
    removeUser,
    isUserFree,
    setPlayerState,
    resetPlayerState,
    createUserWithLocation
} = require('./Functions')

const { UserStatus } = require('../components/App/Enums')

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
            createUserWithLocation({ name, socket }).then(user => {
                users = addUser({ user, users })
                socket.user = user
                response.users = users
                response.user = user
                socket.emit(LOGIN_RESPONSE, { response })
                socket.broadcast.emit(REFRESH_USERS, { users })
            })
        }
    })

    socket.on(INVITATION_SENT, ({ invitation }) => {
        if (isUserFree({ user: invitation.from, users })) {
            if (isUserFree({ user: invitation.to, users })) {
                let { socketId } = invitation.to
                socket.to(socketId).emit(INVITATION_GOT, { invitation })
            }
        }
    })

    socket.on(INVITATION_ACCEPT, ({ invitation }) => {
        let chat = createChatroom({
            from: invitation.from,
            to: invitation.to
        })

        users = setPlayerState({
            user: invitation.from,
            users,
            io,
            status: UserStatus.BUSY,
            chatId: chat.id
        })

        users = setPlayerState({
            user: invitation.to,
            users,
            io,
            status: UserStatus.BUSY,
            chatId: chat.id
        })

        io.emit(REFRESH_USERS, { users })

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

        users = resetPlayerState({
            user,
            users
        })

        users = resetPlayerState({
            user: partner,
            users
        })

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
