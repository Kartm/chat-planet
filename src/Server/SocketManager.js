const io = require('./server.js').io

const { LOGIN_ATTEMPT, LOGIN_RESPONSE, REFRESH_USERS } = require('./Events')

const { createUser } = require('./Factories')
const { isNameInUse, addUser } = require('./Functions')

let users = {}

module.exports = socket => {
    socket.emit(REFRESH_USERS, { users })
    socket.on(LOGIN_ATTEMPT, data => {
        const { name, countryCode } = data

        let response = { user: null, error: null, users: null }
        if (isNameInUse({ name, users })) {
            response.error = 'Username in use.'
        } else {
            const user = createUser(
                {
                    name,
                    countryCode
                },
                users
            )
            users = addUser({ user, users })
            response.users = users
            response.user = data
            io.emit(REFRESH_USERS, { users })
        }
        socket.emit(LOGIN_RESPONSE, { response })
    })
}
