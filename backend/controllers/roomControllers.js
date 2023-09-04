const Room = require("../models/room");
const Message = require("../models/message");
const generateCode = require("../helpers/geneateCode");

const createRoom = async (req, res) => {
  try {
    let code = generateCode();
    let existingRoom = await Room.findOne({ code });
    while (existingRoom) {
      code = generateCode();
      existingRoom = await Room.findOne({ code });
    }

    const newRoom = new Room({
      ...req.body,
      ...{ code, participants: [req.id] ,lastMessageSender:req.id},
    });

    await newRoom.save();
    res.status(200).json({ message: 'room created' });
  } catch (error) {
    res.status(500).json({ message: 'error creating new room' });
  }
};
const getRooms = async(req,res) => {
const currentUser=req.id;
try {
  const rooms = await Room.find({ participants: currentUser }).exec();
  res.status(200).json(rooms)
} catch (error) {
  res.status(500).json({ message: 'error getting the rooms' });
}
};

const deleteRoom = () => {};
const updateRoom = () => {};

module.exports = {
  createRoom,
  getRooms,
  deleteRoom,
  updateRoom,
};
