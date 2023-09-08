const express = require("express");
const router = express.Router();
const {getMessages}=require('../controllers/messageControllers')
const { authenticateToken } = require("../middlewares/authMiddleware");

router.get("/get", authenticateToken, getMessages);

module.exports = router;
