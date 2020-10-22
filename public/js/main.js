const chatForm =document.getElementById('chat-form');
const chatMessages=document.querySelector('.chat-messages');
const roomName=document.getElementById('room-name')
const userList=document.getElementById('users')

//get username and room from url
const {username, room}=Qs.parse(location.search,{
    ignoreQueryPrefix:true //to ignore & and other symbols
});
console.log(username, room)
const socket=io();

//join chat room
socket.emit('joinRoom',{username,room})

//get room and users
socket.on('roomUsers',({room,users})=>{
    outputRoomName(room);
    outputUsers(users);
})
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
//Add Room name to DOM
function outputRoomName(room){
    roomName.innerText= room;
}
//Add users to DOM
function outputUsers(users){
    userList.innerHTML='';
    users.forEach(user=>{
        const li = document.createElement('li');
        li.innerText = user.username;
        userList.appendChild(li);
      });
     }
   