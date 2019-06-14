const iplocation = require('iplocation').default
const { createUser } = require('./Factories')
const faker = require('faker')
const Address6 = require('ip-address').Address6

const isNameInUse = ({ name, users }) => {
    return name in users
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
    return users[id].status === 'free'
}

const setPlayerState = ({ user, users, io, status, chatId }) => {
    users[user.id].status = status
    users[user.id].chatroomId = chatId
    io.sockets.connected[user.socketId].join(chatId)
    return users
}

const resetPlayerState = ({ user, users }) => {
    users[user.id].status = 'free'
    users[user.id].chatroomId = null
    return users
}

const localIps = ['127.0.0.1', '::ffff:127.0.0.1', '::1']

const createUserWithLocation = ({ name, socket }) =>
    new Promise((resolve, reject) => {
        let ip = socket.request.connection.remoteAddress
        //* in case we have an ipv6 address, which is not supported
        //* by the iplocation
        ip = ip.split(':').pop()
        const isLocal = localIps.some(value => {
            return value === ip
        })

        if (isLocal) {
            ip = faker.internet.ip()
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
    createUserWithLocation
}
