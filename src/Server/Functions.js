const iplocation = require('iplocation').default
const { createUser } = require('./Factories')
const faker = require('faker')
const { UserStatus } = require('../components/App/Enums')

const isNameInUse = ({ name, users }) => {
    for (let i = 0; i < Object.values(users).length; i++) {
        const user = Object.values(users)[i]
        if (user.name === name) return true
    }
    return false
}

const addUser = ({ user, users }) => {
    let newUsers = Object.assign({}, users)
    newUsers[user.id] = user
    return newUsers
}

const removeUser = ({ user, users }) => {
    let newUsers = Object.assign({}, users)
    delete newUsers[user.id]
    return newUsers
}

const isUserFree = ({ user, users }) => {
    let id = user.id
    return users[id].status === UserStatus.FREE
}

const setPlayerState = ({ user, users, io, status, chatId }) => {
    users[user.id].status = status
    users[user.id].chatroomId = chatId
    io.sockets.connected[user.socketId].join(chatId)
    return users
}

const resetPlayerState = ({ user, users }) => {
    users[user.id].status = UserStatus.FREE
    users[user.id].chatroomId = null
    return users
}

const localIps = ['127.0.0.1', '::ffff:127.0.0.1', '::1', '1']

const isInternalIp = ip => {
    return ip.split('.')[0] === '10'
}

const getClientIp = socket => {
    let ip = socket.request.connection.remoteAddress
    ip = ip.split(':').pop() //* in case it's an ipv6 address
    if (isInternalIp(ip)) {
        ip = socket.request.headers['x-forwarded-for']
    }
    return ip
}

const createUserWithLocation = ({ name, socket }) =>
    new Promise((resolve, reject) => {
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
                const user = createUser({
                    name,
                    ip,
                    socketId: socket.id,
                    countryCode: res.countryCode,
                    latitude: res.latitude,
                    longitude: res.longitude
                })
                resolve(user)
            })
            .catch(err => {
                reject(err)
            })
    })

module.exports = {
    isNameInUse,
    addUser,
    removeUser,
    isUserFree,
    setPlayerState,
    resetPlayerState,
    createUserWithLocation,
    getClientIp
}
