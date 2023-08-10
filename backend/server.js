require("dotenv").config();
const express = require("express");
const bcrypt = require('bcryptjs');

const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const mongoose = require("mongoose");
const User = require("./models/user");
app.use(bodyParser.json());
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log(`Connected to MongoDB`);
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB", error);
  });
// Enable CORS for all routee
app.use(cors());

app.post("/signup", async (req, res) => {
  const { firstName, lastName, username, email } = req.body;
  const password = await bcrypt.hash(req.body.password, 10);
  req.body={...req.body,...{password}}
  
  try {
    const existingUsername = await User.findOne({ username }).exec();
    const existingEmail = await User.findOne({ email }).exec();
    if (existingEmail && existingUsername) {
      return res
        .status(400)
        .json({
          username: "username already exists.",
          email: "Email already exists.",
        });
    }
    if (existingUsername) {
      return res.status(400).json({ username: "Username already exists." });
    }

    if (existingEmail) {
      return res.status(400).json({ email: "Email already exists." });
    }

    // Both username and email are unique, proceed with saving the new user
    const newUser = new User(req.body);
    await newUser.save();

    return res.status(200).json({ message: "User saved to the database" });
  } catch (error) {
    console.error("Error saving user:", error);
    return res
      .status(500)
      .json({ message: "Error saving user to the database" });
  }
});

app.listen(4000);
