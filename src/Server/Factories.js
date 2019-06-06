const uuidv4 = require('uuid/v4')

const createUser = ({
    name,
    socketId,
    countryCode,
    latitude,
    longitude
} = {}) => ({
    id: uuidv4(),
    name,
    socketId,
    countryCode,
    latitude,
    longitude
})

module.exports = {
    createUser
}
