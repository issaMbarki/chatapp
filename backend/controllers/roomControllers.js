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
    return res.status(200).json({roomId:newRoom._id });
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
      return res.status(404).json({message:'There is no room with this code'});
    }
    const isParticipantAlreadyInRoom = room.participants.includes(newUser);
    if (isParticipantAlreadyInRoom) {
      return res.status(409).json({message:'You are already in this room'})
    }
    if (room.participants.length >= room.allowedUsers) {
       return res.status(403).json({message:'this room is full'})
    }
    room.participants.push(newUser);
    await room.save();
    return res.status(200).json({roomId:room._id });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "error joining the room" });
  }
};
const deleteRoom = () => {};
const updateRoom = () => {};
const joinRooms = async({userId},socket) => {
try {
  const rooms = await Room.find({ participants: userId },'_id').exec();
  rooms.forEach(room=>socket.join(room.id))
} catch (error) {
  console.log("Error getting rooms:", error);
  
}
};


module.exports = {
  createRoom,
  getRooms,
  joinRoom,
  deleteRoom,
  updateRoom,
  joinRooms,
};
