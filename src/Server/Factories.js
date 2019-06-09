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
    longitude,
    status: 'free'
})

module.exports = {
    createUser
}
