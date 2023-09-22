import SendIcon from "@mui/icons-material/Send";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import { Box, IconButton, TextField } from "@mui/material";
import { useContext, useState } from "react";
import { handleMessageChange, handleKeyPress } from "../../utils/handlers";
import { SocketContext } from "../../context/SocketContext";
import { UserContext } from "../../context/UserContext";

export const MessageInput = ({ setMessageInputHeight ,currentRoomId}) => {
  const {_id:sender}=useContext(UserContext)
  const { socket } = useContext(SocketContext);
  const [message, setMessage] = useState("");
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message) {
      socket.emit("send-message", { content:message,roomId:currentRoomId ,sender});
      setMessage("");
      setMessageInputHeight(50)
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
        autoFocus
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
