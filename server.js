const express =require('express');
const http =require('http');
const path=require('path');
const socketio =require('socket.io');
const app =express()
const server=http.createServer(app)
const io=socketio(server)
//@static folder setup
app.use(express.static(path.join(__dirname,'public')))
//Run when client is connected 
io.on('connection',socket=>{
    console.log('New WS connection')
    //welcoming current user
    socket.emit('message','Welcome to chatCord');

    //broadcast when a user connects(emits to everyone except the user who is connecting)
    socket.broadcast.emit('message','A user has join the chat');
    //runs when client disconnects
    socket.on('disconnect',()=>{
        //let everyone know that the user has left the chat
        io.emit('message','A user has left the chat')
    });
    //listen for chat message
    socket.on('chatMessage',msg=>{
        console.log(msg)
        io.emit('message',msg)
    })
})

const PORT=3000 || process.env.PORT;
server.listen(PORT, ()=>console.log(`Server running on port ${PORT}`))