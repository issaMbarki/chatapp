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
const messageRoutes = require("./routes/messageRoutes");
const { sendMessage } = require("./controllers/messageControllers");
const { joinRooms } = require("./controllers/roomControllers");
const { leaveAllRooms } = require("./helpers/socket-io-helpers");

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
  socket.on("send-message", (message) => {
    sendMessage(message, io);
  });
  socket.on("join-rooms", (userId) => {
    joinRooms(userId, socket);
  });
  socket.on("joinORcreate-new-room", (roomId) => {
    socket.join(roomId);
  });
  socket.on("disconnecting", () => leaveAllRooms(socket));
});
server.listen(4000, () => {
  console.log("server is running");
});
// app.listen(4000);
