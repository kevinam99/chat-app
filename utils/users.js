const users = []

// Join user to chat

function userJoin(id, username, room)
{
    const user = {id, username, room}
    users.push(user)
    return user
}

// get current user

function getCurrentUser(id) 
{
    return users.find(user => user.id === id)
}

function getRoomUsers(room)
{
    return users.filter(user => user.room === room)
}

module.exports = {
    userJoin,
    getCurrentUser,
    getRoomUsers
}