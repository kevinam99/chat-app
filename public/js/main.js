const chatForm = document.getElementById('chat-form');
const socket = io();
const chatMessages = document.querySelector('.chat-messages')
const roomName = document.getElementById('room-name')
const usersList = document.getElementById('users')

// get username and room from URL using the qs library
const { username, room } = Qs.parse(location.search, {
    ignoreQueryPrefix: true
})

// join chatroom
socket.emit('joinRoom', {username, room})

socket.on('message', message => {
    console.log(message); // seen in browser console.

    outputMessage(message); // output message to chat window

    // scroll down to latest message
    chatMessages.scrollTop = chatMessages.scrollHeight
})

// get room and room users

socket.on('roomUsers', ({room, users}) => {
    outputRoomName(room)
    outputUsers(users)
})

// Message submit

chatForm.addEventListener('submit', (event) => {
    event.preventDefault()

    const msg = event.target.elements.msg.value; // message from textbox

    socket.emit('chatMessage', msg)

    // clear input
    event.target.elements.msg.value = ""
    event.target.elements.msg.focus()
})

function outputMessage(message)
{
    const div = document.createElement('div')
    div.classList.add('message')
    div.innerHTML = `<p class = "meta"> ${message.username} <span>${message.time}</span> </p>
                <p class = "text">
                    ${message.textMessage}
                    </p>`
    document.querySelector('.chat-messages').appendChild(div)
}

// add room name to DOM
function outputRoomName(room)
{
    roomName.innerHTML = room;
}

// add users to DOM

function outputUsers(users)
{
    usersList.innerHTML = `
            ${users.map(user => `<li> ${user.username} </li>`).join('')} `
}