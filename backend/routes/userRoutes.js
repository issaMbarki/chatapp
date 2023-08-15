const express = require("express");
const router = express.Router();
const {
  logOut,
  signUp,
  signIn,
  isAuth,
} = require("../controllers/authControllers");
const { authenticateToken } = require("../middlewares/authMiddleware");

router.post("/signup",  signUp);
router.post("/signin",  signIn);
router.post("/logout", authenticateToken, logOut);
router.get("/isAuth", authenticateToken, isAuth);
module.exports = router;
