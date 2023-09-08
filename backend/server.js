require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./configs/db");
const http = require("http");
const { Server } = require("socket.io");
const app = express();
const userRoutes = require("./routes/userRoutes");
const roomRoutes = require("./routes/roomRoutes");
const messageRoutes=require('./routes/messageRoutes')

app.use(express.json());
app.use(cookieParser());
// Enable CORS
app.use(
  cors({
    origin: ["http://localhost:3000", "http://192.168.43.228:3000"],
    credentials: true,
  })
);

//connect the db
connectDB();
app.use("/auth", userRoutes);
app.use("/room", roomRoutes);
app.use("/message", messageRoutes);


const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000", "http://192.168.43.228:3000"],
  },
});
io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);
  socket.on("send-message", ({ message: newMessage }) => {
    io.emit("new-message", {
      _id: Math.floor(Math.random() * (200 + 1)),
      sender: "issam",
      content: newMessage,
    });
  });
});
server.listen(4000, () => {
  console.log("server is running");
});
// app.listen(4000);
