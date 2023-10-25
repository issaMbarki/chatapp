const Message = require("../models/message");
const Room = require("../models/room");
const User = require("../models/user");

const getMessages = async (req, res) => {
  try {
    const { roomId } = req.query;
    console.log(roomId);
    const messages = await Message.find({ roomId }).populate("sender","username")
      .sort({ timestamp: 1 })
      .exec();
    return res.status(200).json(messages);
  } catch (error) {
    return res.status(500).json({ message: "error getting messages" });
  }
};
const sendMessage = async ({ sender, content, roomId }, io) => {
  try {
    // Create a new message instance
    const newMessage = new Message({
      roomId,
      sender,
      content,
    });

    // Save the new message to the database
    await newMessage.save();

    // Update the corresponding room's fields
    await Room.findByIdAndUpdate(
      roomId,
      {
        $set: {
          lastMessage: newMessage._id,
          lastMessageSender: sender,
        },
      },
      { new: true }
    ).exec();

    // Retrieve the populated sender document
    const populatedSender = await User.findById(sender);

    // Assign the populated sender to the newMessage object
    newMessage.sender = populatedSender;

    // Emit the new message to all connected users in the room
    io.in(roomId).emit("new-message", newMessage);
  } catch (error) {
    console.log("Error saving message:", error);
  }
};

module.exports = {
  getMessages,
  sendMessage,
};
