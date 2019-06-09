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

module.exports = { isNameInUse, addUser, removeUser }
