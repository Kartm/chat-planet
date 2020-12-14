import { User, Users, UserStatus } from '../models/User.interface'

import { io } from './server'

import { Events } from '../models/Events.enum'

import { createChatroom } from './Factories'
import {
    isNameInUse,
    addUser,
    removeUser,
    isUserFree,
    setPlayerState,
    resetPlayerState,
    createUserWithLocation
} from './Functions'
import { Socket } from 'socket.io'

let users: Users = {}

const randomPos = () => {
    let result = Math.floor(Math.random() * 30) + 10
    return result
}

export default (socket: Socket & { user: User | null }) => {
    socket.emit(Events.REFRESH_USERS, { users })
    socket.on(Events.LOGIN_ATTEMPT, data => {
        const { name } = data
        let response = { user: null, error: null, users: null } as {
            user: User | null
            error: string | null
            users: Users | null
        }

        if (isNameInUse({ name, users })) {
            response.error = 'Username in use.'
            socket.emit(Events.LOGIN_RESPONSE, { response })
        } else {
            createUserWithLocation({ name, socket }).then(user => {
                users = addUser({ user, users })
                socket.user = user
                response.users = users
                response.user = user
                socket.emit(Events.LOGIN_RESPONSE, { response })
                socket.broadcast.emit(Events.REFRESH_USERS, { users })
            })
        }
    })

    socket.on(Events.INVITATION_SENT, ({ invitation }) => {
        if (isUserFree({ user: invitation.from, users })) {
            if (isUserFree({ user: invitation.to, users })) {
                let { socketId } = invitation.to
                socket.to(socketId).emit(Events.INVITATION_GOT, { invitation })
            }
        }
    })

    socket.on(Events.INVITATION_ACCEPT, ({ invitation }) => {
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

        io.emit(Events.REFRESH_USERS, { users })

        io.in(chat.id).emit(Events.CHATROOM_CREATE, { chat })
    })

    const getPartner = ({ user, users }: { user: User; users: Users }) => {
        let result = Object.values(users).filter(arrUser => {
            if (arrUser.chatroomId === user.chatroomId) {
                if (arrUser.id !== user.id) return true
                return false
            }
            return false
        })
        return result.pop()
    }

    socket.on(Events.CHAT_MESSAGE, ({ message }) => {
        socket.in(message.who.chatroomId).emit(Events.CHAT_MESSAGE, { message })
    })

    socket.on(Events.CHAT_LEAVE, () => {
        if (socket.user) {
            const user = users[socket.user.id]
            const partner = getPartner({ user, users })
            const { chatroomId } = user

            if (partner && chatroomId) {
                users = resetPlayerState({
                    user,
                    users
                })

                users = resetPlayerState({
                    user: partner,
                    users
                })

                io.in(chatroomId).emit(Events.CHAT_LEAVE, null)
                io.sockets.connected[user.socketId].leave(chatroomId)
                io.sockets.connected[partner.socketId].leave(chatroomId)
                io.emit(Events.REFRESH_USERS, { users })
            }
        }
    })

    socket.on('disconnect', () => {
        if (socket.user) {
            const { user } = socket
            let { chatroomId } = users[user.id]
            users = removeUser({ user, users })

            if (chatroomId) {
                const partner = getPartner({ user, users })
                io.in(chatroomId).emit(Events.CHAT_LEAVE, null)
                if (partner) {
                    users = resetPlayerState({
                        user: partner,
                        users
                    })
                    io.sockets.connected[partner.socketId].leave(chatroomId)
                }

                io.emit(Events.REFRESH_USERS, { users })
            }
        }
    })
}
