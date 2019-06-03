const isUsernameInUse = ({ username, users }) => {
    return username in Object.keys(users)
}

const addUser = ({ user, users }) => {
    let newUsers = Object.assign({}, users)
    newUsers[user.nickname] = user
    return newUsers
}

export default { isUsernameInUse, addUser }
