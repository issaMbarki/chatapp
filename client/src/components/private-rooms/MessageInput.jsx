import SendIcon from "@mui/icons-material/Send";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import { Box, IconButton, TextField } from "@mui/material";
import { useContext, useState,useEffect } from "react";
import { handleMessageChange, handleKeyPress } from "../../utils/handlers";
import { SocketContext } from "../../context/SocketContext";

export const MessageInput = ({ setMessageInputHeight }) => {
  const { socket } = useContext(SocketContext);
  const [message, setMessage] = useState("");

  useEffect(() => {
    socket.on('message', (newMessage) => {
      console.log(newMessage);
    });
  }, []);
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message) {
      socket.emit("sendMessage", { message });
      setMessage("")
    }
  };
  return (
    <Box
      component="form"
      onSubmit={handleSendMessage}
      p={1}
      display="flex"
      alignItems="center"
    >
      <TextField
        label="Type a message"
        fullWidth
        multiline
        maxRows={4}
        variant="outlined"
        size="small"
        value={message}
        onChange={(e) =>
          handleMessageChange(e, setMessage, setMessageInputHeight)
        }
        onKeyDown={(e) => handleKeyPress(e, handleSendMessage)} // I want when the user press enter, sen dthe message not add break line
      />
      <IconButton>
        <EmojiEmotionsIcon />
      </IconButton>
      <IconButton type="submit">
        <SendIcon />
      </IconButton>
    </Box>
  );
};
