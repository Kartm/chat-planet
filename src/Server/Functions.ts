import iplocation from 'iplocation'
import faker from 'faker'
import { createUser } from './Factories'
import { User, Users, UserStatus } from '../models/User.interface'
import { Server, Socket } from 'socket.io'

export const isNameInUse = ({
    name,
    users
}: {
    name: string
    users: Users
}) => {
    for (let i = 0; i < Object.values(users).length; i++) {
        const user = Object.values(users)[i]
        if (user.name === name) return true
    }
    return false
}

export const addUser = ({ user, users }: { user: User; users: Users }) => {
    let newUsers = Object.assign({}, users)
    newUsers[user.id] = user
    return newUsers
}

export const removeUser = ({ user, users }: { user: User; users: Users }) => {
    let newUsers = Object.assign({}, users)
    delete newUsers[user.id]
    return newUsers
}

export const isUserFree = ({ user, users }: { user: User; users: Users }) => {
    let id = user.id
    return users[id].status === UserStatus.FREE
}

export const setPlayerState = ({
    user,
    users,
    io,
    status,
    chatId
}: {
    user: User
    users: Users
    io: Server
    status: UserStatus
    chatId: string
}) => {
    users[user.id].status = status
    users[user.id].chatroomId = chatId
    io.sockets.connected[user.socketId].join(chatId)
    return users
}

export const resetPlayerState = ({
    user,
    users
}: {
    user: User
    users: Users
}) => {
    users[user.id].status = UserStatus.FREE
    users[user.id].chatroomId = null
    return users
}

export const localIps = ['127.0.0.1', '::ffff:127.0.0.1', '::1', '1']

export const isInternalIp = (ip: string) => {
    return ip.split('.')[0] === '10'
}

export const getClientIp = (socket: Socket) => {
    let ip = socket.request.connection.remoteAddress
    ip = ip.split(':').pop() //* in case it's an ipv6 address
    if (isInternalIp(ip)) {
        ip = socket.request.headers['x-forwarded-for']
    }
    return ip
}

export const createUserWithLocation = ({
    name,
    socket
}: {
    name: string
    socket: Socket
}) =>
    new Promise<User>((resolve, reject) => {
        let ip = getClientIp(socket)
        const isLocal = localIps.some(value => {
            return value === ip
        })

        if (isLocal) {
            ip = faker.internet.ip()
            ip = '72.229.28.185' //* a completely random IP address
        }

        iplocation(ip, [])
            .then(res => {
                const user = createUser(
                    name,
                    socket.id,
                    ip,
                    res.countryCode,
                    res.latitude,
                    res.longitude
                )
                resolve(user)
            })
            .catch(err => {
                reject(err)
            })
    })
