const Room = require("../models/room");
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
    return res.status(200).json({newRoom });
  } catch (error) {
    return res.status(500).json({ message: "error creating new room" });
  }
};
const getRooms = async (req, res) => {
  const currentUser = req.id;
  try {
    const rooms = await Room.find({ participants: currentUser })
      .populate("participants")
      .populate("lastMessageSender", "firstName") // Populate the lastMessageSender field with the firstName
      .populate("lastMessage") // Populate the lastMessage field
      .exec();
    return res.status(200).json(rooms);
  } catch (error) {
    return res.status(500).json({ message: "error getting the rooms" });
  }
};
const joinRoom = async (req, res) => {
  try {
    const newUser = req.id;
    const code = req.body.code;
    const room = await Room.findOne({ code }).populate("participants").exec();
    if (!room) {
      return res
        .status(404)
        .json({ message: "There is no room with this code" });
    }
    const isParticipantAlreadyInRoom = room.participants.includes(newUser);
    if (isParticipantAlreadyInRoom) {
      return res.status(409).json({ message: "You are already in this room" });
    }
    if (room.participants.length >= room.allowedUsers) {
      return res.status(403).json({ message: "this room is full" });
    }
    room.participants.push(newUser);
    await room.save();
    return res.status(200).json({ room });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "error joining the room" });
  }
};
const leaveRoom = async (req,res) => {
  const userId = req.id
  const {roomId:roomToLeave}=req.body
  try {
    const room = await Room.findById(roomToLeave);

    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    const participantIndex = room.participants.indexOf(userId);
    if (participantIndex === -1) {
      return res.status(400).json({ message: "User is not a participant in the room" });
    }

    room.participants.splice(participantIndex, 1);

    // If the user is the last participant, delete the room from the database
    if (room.participants.length === 0) {
      await Room.findByIdAndDelete(roomToLeave);
      return res.status(200).json({ room });
    }

    await room.save();

   return res.status(200).json({ room });
   
  } catch (error) {
    console.error("Error removing user from room:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
const updateRoom = () => {};
const joinRooms = async ({ userId }, socket) => {
  try {
    const rooms = await Room.find({ participants: userId }, "_id").exec();
    rooms.forEach((room) => socket.join(room.id));
  } catch (error) {
    console.log("Error getting rooms:", error);
  }
};

module.exports = {
  createRoom,
  getRooms,
  joinRoom,
  leaveRoom,
  updateRoom,
  joinRooms,
};
