import SendIcon from "@mui/icons-material/Send";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import { Box, IconButton, TextField } from "@mui/material";
import { useRef } from "react";

export const MessageInput = ({ setMessageInputHeight }) => {
  const textFieldRef = useRef(null);

  const resizeInputHeight = () => {
    const lineBreakCount = (textFieldRef.current?.value.match(/\n/g) || [])
      .length;
    console.log("Number of line breaks:", lineBreakCount);
    if (lineBreakCount === 0) {
      setMessageInputHeight(50);
    } else if (lineBreakCount === 1) {
      setMessageInputHeight(50+23);
    } else if (lineBreakCount === 2) {
      setMessageInputHeight(50+23*2);
    }else if (lineBreakCount === 3) {
      setMessageInputHeight(50+23*3);
    }
  };
  return (
    <Box p={1} display="flex" alignItems="center">
      <TextField
        label="Type a message"
        fullWidth
        multiline
        maxRows={4}
        variant="outlined"
        size="small"
        inputRef={textFieldRef}
        onChange={resizeInputHeight}
      />
      <IconButton>
        <EmojiEmotionsIcon />
      </IconButton>
      <IconButton>
        <SendIcon />
      </IconButton>
    </Box>
  );
};
