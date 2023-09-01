const express = require("express");
const router = express.Router();
const {
  createRoom,
  getRooms,
  deleteRoom,
  updateRoom,
} = require("../controllers/roomControllers");
const { authenticateToken } = require("../middlewares/authMiddleware");

router.post("/create", authenticateToken, createRoom);
router.get("/get", authenticateToken, getRooms);
router.delete("/delete", authenticateToken, deleteRoom);
router.patch("/update", authenticateToken, updateRoom);
module.exports = router;
