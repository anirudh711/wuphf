const chatForm =document.getElementById('chat-form')
const chatMessages=document.querySelector('.chat-messages')
const socket=io();

//message from the server
socket.on('message',message=>{
    console.log(message);
    outputMessage(message)
    //scroll down to focus 
    chatMessages.scrollTop=chatMessages.scrollHeight
    //clearing input
    e.target.elements.msg.value='';
    e.target.elements.msg.focus();
})

chatForm.addEventListener('submit',e=>{
    e.preventDefault();
    //message on the chat box
    const msg=e.target.elements.msg.value;
    //emitting message to server
    socket.emit('chatMessage',msg)
})

//output message to dom
function outputMessage(message){
    const div=document.createElement('div');
    div.classList.add('message');
    div.innerHTML=`<p class="meta">Brad <span>9.12pm</span></p>
    <p class="text">
    ${message}
    </p>
    `
    document.querySelector('.chat-messages').appendChild(div);
}