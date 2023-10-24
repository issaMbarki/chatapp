require("dotenv").config();
const jwt = require("jsonwebtoken");

// Middleware to authenticate the JWT
function authenticateToken(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "No token" });
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decodedToken) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }
    req.username = decodedToken.username;
    req.id = decodedToken.id;
    next();
  });
}
module.exports = {
  authenticateToken,
};
