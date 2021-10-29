// const {io} = require("socket.io-client");
const socket= io('http://localhost:8000');

const form= document.getElementById('send-container');
const messageInput= document.getElementById('messageInp');  
const messageContainer= document.querySelector(".container");   //if msg comes, i will put it in container
var audio= new Audio('../ting.mp3')


const append= (message, position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText=message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position=='left'){
        audio.play();
    }
}

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const message= messageInput.value;
    append(`You: ${message}`, 'right');
    socket.emit('send', message);
    messageInput.value='';
})

// const name1 = prompt("Enter you name to join: ");
socket.emit('new-user-joined', name1);

socket.on('user-joined', name=>{
    append(`${name} joined the chat`, 'center');
})

socket.on('recieve', data=>{
    append(`${data.name}: ${data.message}`, 'left');
})

socket.on('left', name=>{
    append(`${name} left the chat`, 'center');
})