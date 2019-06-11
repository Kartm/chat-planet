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

module.exports = {
    isNameInUse,
    addUser,
    removeUser,
    isUserFree,
    setPlayerState,
    resetPlayerState
}
