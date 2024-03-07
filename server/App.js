const express = require("express");
const app = express();
const io = "socket.io";
const PORT = 3000;
const path = require("path");

// Serve static files from the "client" directory
app.use(express.static(path.join(__dirname, "..", "client/dist")));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
