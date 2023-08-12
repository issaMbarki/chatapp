require("dotenv").config();
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const cookieParser = require("cookie-parser");

// const bodyParser = require("body-parser");
const app = express();
const mongoose = require("mongoose");
const User = require("./models/user");
app.use(express.json());
app.use(cookieParser());
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log(`Connected to MongoDB`);
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB", error);
  });
// Enable CORS for all routee
app.use(
  cors({
    origin: ["http://localhost:3000", "http://192.168.43.228:3000"],
    credentials: true,
  })
);

app.post("/signup", async (req, res) => {
  const { firstName, lastName, username, email } = req.body;
  const password = await bcrypt.hash(req.body.password, 10);
  req.body = { ...req.body, ...{ password } };

  try {
    const existingUsername = await User.findOne({ username }).exec();
    const existingEmail = await User.findOne({ email }).exec();
    if (existingEmail && existingUsername) {
      return res.status(400).json({
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
app.post("/signin", async (req, res) => {
  const { emailUsername, password } = req.body;
  //search the user with the email or username provided
  const user = await User.findOne({
    $or: [{ email: emailUsername }, { username: emailUsername }],
  }).exec();

  if (!user)
    return res
      .status(404)
      .json({ emailUsername: "Email or username doesn't exist" });
  bcrypt.compare(password, user.password, (err, result) => {
    if (err) {
      return res.json({ message: "something went wrong" });
    } else if (result) {
      // Generate JWT token
      const token = jwt.sign(
        { username: user.username },
        process.env.JWT_SECRET_KEY
      );
      // , {
      //   expiresIn: "1h",
      // }

      // Set the token as a cookie
      res.cookie("token", token, {
        httpOnly: true,
        maxAge: 60 * 24 * 60 * 60 * 1000, //set the ookie for 60 day
      });
      console.log("successful log in");
      return res.status(200).json({ message: "Login successful." });
    } else {
      return res.status(401).json({ password: "Incorrect password." });
    }
  });
});
app.get("/protected", authenticateToken, (req, res) => {
  res.json(req.user);
});
app.get("/isAuth", authenticateToken, async (req, res) => {
  const username = req.username;
  const user = await User.findOne({ username }).select("-password").exec();
  if (user) {
    return res.status(200).json({ user });
  }
  return res.status(403).json({ messsage: "not logged in" });
});
app.post("/logout", authenticateToken, (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logged out successfully." });
});
// Middleware to authenticate the JWT
function authenticateToken(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ messageg: "No token" });
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decodedToken) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }
    req.username = decodedToken.username;
    next();
  });
}
app.listen(4000);
