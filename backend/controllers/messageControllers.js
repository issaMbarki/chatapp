const Message = require("../models/message");
const Room = require("../models/room");

const getMessages = async (req, res) => {
  try {
    const { roomId } = req.body;
    const messages = await Message.find({ roomId })
      .sort({ timestamp: -1 })
      .exec();
    return res.status(200).json(messages);
  } catch (error) {
    return res.status(500).json({ message: "error getting messages" });
  }
};

module.exports = {
  getMessages,
};
