require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./configs/db");
const app = express();
const userRoutes = require("./routes/userRoutes");

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
app.listen(4000);
