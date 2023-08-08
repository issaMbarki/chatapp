require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
// const cors = require('cors');
// const bodyParser = require('body-parser');
const app = express();
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log(`Connected to MongoDB`);
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB", error);
  });
// respond with "hello world" when a GET request is made to the homepage
app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(4000);
