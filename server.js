const express = require("express");
const http = require("http");
const path = require("path");
const socketio = require("socket.io");
const app = express();
const server = http.createServer(app);
const io = socketio(server);
//@static folder setup
app.use(express.static(path.join(__dirname, "public")));
//@utils
const formatMessage = require("./utils/messages.js");
const {getCurrentUser,userJoin} =require("./utils/users")

const botName = "Wuphf Bot";
//Run when client is connected
io.on("connection", (socket) => {
  socket.on("joinRoom", ({ username, room }) => {
    const user=userJoin(socket.id,username,room)
    socket.join(user.room)
    //welcoming current user
    socket.emit("message", formatMessage(botName, "Welcome to chatCord"));

    //broadcast when a user connects(emits to everyone except the user who is connecting)
    socket.broadcast.to(user.room).emit(
      "message",
      formatMessage(botName, `${user.username} has join the chat`)
    );
  });

  //listen for chat message
  socket.on("chatMessage", (msg) => {
    console.log(msg);
    io.emit("message", formatMessage("USER", msg));
  });
  //runs when client disconnects
  socket.on("disconnect", () => {
    //let everyone know that the user has left the chat
    io.emit("message", formatMessage(botName, "A user has left the chat"));
  });
});

const PORT = 3000 || process.env.PORT;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
