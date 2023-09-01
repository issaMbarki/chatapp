const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  roomName:{
    type: String,
    required: true
  },
  allowedUsers: {
    type: Number,
    required: true
  },
  roomType: {
    type: String,
    enum: ['locked', 'open'],
    default: 'open'
  },
  code: {
    type: String,
    required: true,
    unique: true
  },
  participants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
});
const Room =mongoose.model('Room', roomSchema);
module.exports = Room;