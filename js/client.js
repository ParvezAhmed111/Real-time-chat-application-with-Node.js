const {io} = require("socket.io-client");
const socket= io('http://localhost:5500');

const form= document.getElementById('send-container');
const messageInput= document.getElementById('messageInp');  
const messageContainer= document.querySelector(".container");   //if msg comes, i will put it in container


const append= (message, position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText=message;
    messageElement.classList.add('message');
    messageElement.classList.add('position');
    messageContainer.append(messageElement);
}

const name = socket.prompt("Enter you name to join: ");
socket.emit('new-user-joined', name);


socket.on('user-joined', name=>{
    append(`${name} joined the chat`, name);
})