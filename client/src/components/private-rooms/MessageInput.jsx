import SendIcon from "@mui/icons-material/Send";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import { Box, IconButton, TextField } from "@mui/material";
import { useState } from "react";
import { handleMessageChange, handleKeyPress } from "../../utils/handlers";

export const MessageInput = ({ setMessageInputHeight }) => {
  const [message, setMessage] = useState("");

  const handleSendMessage = (e) => {
    e.preventDefault();
    console.log("submited");
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
