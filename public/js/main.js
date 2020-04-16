const chatForm = document.getElementById('chat-form');
const socket = io();

socket.on('message', message => {
    console.log(message); // seen in browser console.

    outputMessage(message); // output message to DOM
})

// Message submit

chatForm.addEventListener('submit', (event) => {
    event.preventDefault()

    const msg = event.target.elements.msg.value; // message from textbox

    socket.emit('chatMessage', msg)
})

function outputMessage(message)
{
    const div = document.createElement('div')
    div.classList.add('message')
    div.innerHTML = `<p class = "meta"> Kevin <span>9:12 AM</span> </p>
                <p class = "text">
                    ${message}
                    </p>`
    document.querySelector('.chat-messages').appendChild(div)
}