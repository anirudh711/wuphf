const chatForm =document.getElementById('chat-form');
const chatMessages=document.querySelector('.chat-messages');
//get username and room from url
const {username, room}=Qs.parse(location.search,{
    ignoreQueryPrefix:true //to ignore & and other symbols
});
console.log(username, room)
const socket=io();

//join chat room
socket.emit('joinRoom',{username,room})
//message from the server
socket.on('message',message=>{
    console.log(message);
    outputMessage(message)
    //scroll down to focus 
    chatMessages.scrollTop=chatMessages.scrollHeight
})  

chatForm.addEventListener('submit',e=>{
    e.preventDefault();
    //message on the chat box
    const msg=e.target.elements.msg.value;
    //emitting message to server
    socket.emit('chatMessage',msg)
     //clearing input
     e.target.elements.msg.value='';
     e.target.elements.msg.focus();
 })


//output message to dom
function outputMessage(message){
    const div=document.createElement('div');
    div.classList.add('message');
    div.innerHTML=`<p class="meta">${message.username} <span>${message.time}</span></p>
    <p class="text">
    ${message.text}
    </p>
    `
    document.querySelector('.chat-messages').appendChild(div);
}