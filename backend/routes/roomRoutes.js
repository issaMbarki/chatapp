const express = require("express");
const router = express.Router();
const {
  createRoom,
  getRooms,
  joinRoom,
  leaveRoom,
  updateRoom,
} = require("../controllers/roomControllers");
const { authenticateToken } = require("../middlewares/authMiddleware");

router.post("/create", authenticateToken, createRoom);
router.post("/join", authenticateToken, joinRoom);
router.get("/get", authenticateToken, getRooms);
router.post("/leave", authenticateToken, leaveRoom);
router.patch("/update", authenticateToken, updateRoom);
module.exports = router;
