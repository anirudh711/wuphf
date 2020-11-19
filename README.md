# Wuphf
---
### What is it?

Wuphf is a realtime chat application using Nodejs exploiting the Socket.IO library. It is a project to explore the power of Sockets and how they are used to broadcast data let alone send data to a particular entity!

### How does it work?

The two main parts of the application are the server.js, main.js which are wound tightly to make the chat come alive! 

#### Basics
A socket is an entity that can do two things (mainly):

1. Emit

    ```socket.emit("listener", { msg:'wuphf' });```

2. Listen

    ```socket.on("listener", ({msg}) => {console.log(msg)});```

3. BroadCast- Emits to everyone except user

    ```socket.broadcast.to(user.room).emit("message",);```

4. BroadCast- To all members of the room including self

    ```io.to(user.room).emit('roomUsers',{room:user.room})```

#### Step-up

Following are the lifecycle of a user entering the chat wrt sockets

* User joins room
* Welcome user and show the chatroom with list of all other users
* All users will be shown this user joined
* If user types, *typing...* will be shown
* As the user hits enter on the message , the socket registers the message and displays
* User leaves the chat , broadcast to all members that user left.

