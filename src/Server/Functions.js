const isNameInUse = ({ name, users }) => {
    return name in users
}

const addUser = ({ user, users }) => {
    let newUsers = Object.assign({}, users)
    newUsers[user.name] = user
    return newUsers
}

module.exports = { isNameInUse, addUser }
