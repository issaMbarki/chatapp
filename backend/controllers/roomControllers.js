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
      ...{ code, participants: [req.id], owner: req.id },
    });

    await newRoom.save();
    return res.status(200).json({ message: "room created" });
  } catch (error) {
    return res.status(500).json({ message: "error creating new room" });
  }
};
const getRooms = async (req, res) => {
  const currentUser = req.id;
  try {
    const rooms = await Room.find({ participants: currentUser })
      .populate("participants")
      .exec();
   return  res.status(200).json(rooms);
  } catch (error) {
    return res.status(500).json({ message: "error getting the rooms" });
  }
};
const joinRoom = async (req,res) => {
  try {
    const newUser=req.id
    const code =req.body.code
    const room = await Room.findOne({code}).exec();
    if (!room) {
      return res.json({message:'not found'});
    }
    const isParticipantAlreadyInRoom = room.participants.includes(newUser);
    if (isParticipantAlreadyInRoom) {
      return res.json({message:'already in'})
    }
    if (room.participants.length >= room.allowedUsers) {
       return res.json({message:'room is full'})
    }
    room.participants.push(newUser);
    await room.save();
    return res.json({message:'successfully joined'});

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "error joining the room" });
  }
};
const deleteRoom = () => {};
const updateRoom = () => {};

module.exports = {
  createRoom,
  getRooms,
  joinRoom,
  deleteRoom,
  updateRoom,
};
