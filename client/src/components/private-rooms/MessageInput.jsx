import SendIcon from "@mui/icons-material/Send";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import { Box, IconButton, TextField } from "@mui/material";
import { useContext, useState } from "react";
import { handleMessageChange, handleKeyPress } from "../../utils/handlers";
import { SocketContext } from "../../context/SocketContext";
import { UserContext } from "../../context/UserContext";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

export const MessageInput = ({ setMessageInputHeight, currentRoomId }) => {
  const { _id: sender } = useContext(UserContext);
  const { socket } = useContext(SocketContext);
  const [message, setMessage] = useState("");
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      socket.emit("send-message", {
        content: message,
        roomId: currentRoomId,
        sender,
      });
      setMessage("");
      setMessageInputHeight(50);
    }
  };
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const handleEmojisSelect = (event) => {
    const msg=message+event.native
    handleMessageChange(msg, setMessage, setMessageInputHeight)
  };
  return (
    <Box
      component="form"
      onSubmit={handleSendMessage}
      p={1}
      display="flex"
      alignItems="center"
      position="relative"
    >
      <TextField
        label="Type a message"
        fullWidth
        multiline
        autoFocus
        focused={showEmojiPicker}
        maxRows={4}
        variant="outlined"
        size="small"
        value={message}
        onChange={(e) =>
          handleMessageChange(e, setMessage, setMessageInputHeight)
        }
        onKeyDown={(e) => handleKeyPress(e, handleSendMessage)} // I want when the user press enter, sen dthe message not add break line
      />

      <IconButton onClick={(e) => { e.stopPropagation(); setShowEmojiPicker(true)}}>
        {showEmojiPicker && (
          <Box sx={{ position: "absolute", bottom: "3rem", right: 0 }}>
            <Picker
              data={data}
              native
              previewPosition={"none"}
              searchPosition="none"
              onClickOutside={() =>{ setShowEmojiPicker(false)}}
              onEmojiSelect={handleEmojisSelect}
            />
          </Box>
        )}
        <EmojiEmotionsIcon />
      </IconButton>
      <IconButton type="submit" sx={{
        color:message.trim()?"#42a5f5":""
      }}>
        <SendIcon />
      </IconButton>
    </Box>
  );
};
