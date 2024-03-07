const path = require("path");
const http = require("http");
const express = require("express");
const { Socket } = require("socket.io");
const socketIO = require("socket.io");

const publicPath = path.join(__dirname, "/../public");
const port = process.env.PORT || 3000;
let app = express();
let server = http.createServer(app);
let io = socketIO(server);

app.use(express.static(publicPath));

io.on("connection", (socket) => {
  console.log("A user just connected");
  socket.on("disconnect", () => {
    console.log("A user has disconnected");
  });
});

socket.on("startGame", () => {
  io.emit("startGame");
});

server.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
