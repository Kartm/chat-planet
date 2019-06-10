const uuidv4 = require('uuid/v4')

const createUser = ({ name, socketId, countryCode, latitude, longitude }) => ({
    id: uuidv4(),
    name,
    socketId,
    countryCode,
    latitude,
    longitude,
    chatroomId: null,
    status: 'free'
})

const createChatroom = ({ from, to }) => ({
    id: uuidv4(),
    users: { from, to },
    messages: []
})

module.exports = {
    createUser,
    createChatroom
}
