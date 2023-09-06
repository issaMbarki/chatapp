const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  name: {
    type: String,
    required: true,
  },
  allowedUsers: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    enum: ["locked", "open"],
    default: "open",
  },
  lastMessageTimestamp: {
    type: Date,
  },
  lastMessage: {
    type: String,
    default: "you: hello, how are you!",
  },
  lastMessageSender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  code: {
    type: String,
    required: true,
    unique: true,
  },
  participants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});
const Room = mongoose.model("Room", roomSchema);
module.exports = Room;
