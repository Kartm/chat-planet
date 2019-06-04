const uuidv4 = require('uuid/v4')

const createUser = ({ name, socketId, countryCode } = {}) => ({
    id: uuidv4(),
    name,
    socketId,
    countryCode
})

module.exports = {
    createUser
}
