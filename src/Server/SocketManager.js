const io = require('./server.js').io

const { LOGIN_ATTEMPT, LOGIN_RESPONSE, REFRESH_USERS } = require('./Events')

const { createUser } = require('./Factories')
const { isNameInUse, addUser } = require('./Functions')
const iplocation = require('iplocation').default

let users = {}

module.exports = socket => {
    socket.emit(REFRESH_USERS, { users })
    socket.on(LOGIN_ATTEMPT, data => {
        const { name } = data
        let response = { user: null, error: null, users: null }

        if (isNameInUse({ name, users })) {
            response.error = 'Username in use.'
        } else {
            let ip = socket.request.connection.remoteAddress
            ip = '31.42.13.108' //! watch out, remove it later
            iplocation(ip, [])
                .then(res => {
                    const user = createUser({
                        name,
                        socketId: socket.id,
                        countryCode: res.countryCode,
                        latitude: res.latitude,
                        longitude: res.longitude
                    })
                    users = addUser({ user, users })
                    response.users = users
                    response.user = user
                    io.emit(REFRESH_USERS, { users })
                    socket.emit(LOGIN_RESPONSE, { response })
                })
                .catch(err => {
                    response.error = 'Could not get location.'
                })
        }
    })
}
