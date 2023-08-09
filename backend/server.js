require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => {
//     console.log(`Connected to MongoDB`);
//   })
//   .catch((error) => {
//     console.error("Failed to connect to MongoDB", error);
//   });
// Enable CORS for all routee
app.use(cors());


app.post("/signup", (req, res) => {
  console.log(req.body);
});

app.listen(4000);
