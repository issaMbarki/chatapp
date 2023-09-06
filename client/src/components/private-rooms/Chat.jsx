import { Box, Grid, IconButton, Typography } from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import InfoOutlined from "@mui/icons-material/InfoOutlined";
import { useTheme } from "@emotion/react";
import { Participants } from "./Participants";
import { messages } from "./messages";
import { MessageInput } from "./MessageInput";
import { useEffect, useRef, useState } from "react";

export const Chat = ({ currentRoom }) => {
  const theme = useTheme();
  const headerHeight = theme.mixins.toolbar.minHeight;
  const contentHeight = `calc(98vh - ${headerHeight}px)`;
  //here i created a state for the message input because its a textArea with multiple tows, so every time the use add a  row (breakLine) I update the chat box height based on it
  const [messageInputHeight, setMessageInputHeight] = useState(50);
  //80 is the height of the chat header
  const chatBoxHeight = `calc(98vh - ${
    80 + headerHeight + messageInputHeight
  }px)`;
  const chatBoxRef = useRef(null);
  useEffect(() => {
    // Scroll to the end of the chat box when the component is rendered or when the box resized
    chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
  }, [messageInputHeight]);
  return (
    <Grid item xs={currentRoom ? 12 : 0} sm={8}>
      <Box
        sx={{
          height: contentHeight,
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            p: 2,
            backgroundColor: theme.palette.listBackGround.main,
            display: "flex",
            justifyContent: "space-between",
            height: 80,
          }}
        >
          <Box sx={{ display: "flex", gap: 1 }}>
            <IconButton sx={{ display: { xs: "inline-flex", sm: "none" } }}>
              <KeyboardBackspaceIcon />
            </IconButton>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography variant="h6">{currentRoom.name}</Typography>
              <Participants participants={currentRoom.participants} />
            </Box>
          </Box>
          <IconButton sx={{ display: { xs: "inline-flex" } }}>
            <InfoOutlined />
          </IconButton>
        </Box>
        <Box>
          <Box
            ref={chatBoxRef}
            sx={{
              height: chatBoxHeight,
              overflow: "auto",
              display:'flex',flexDirection:'column-reverse'
            }}
          >
            <Box>
            {messages.map((message) => (
              <Box
                key={message._id}
                p={0.8}
                display="flex"
                justifyContent={
                  message.sender === "issam" ? "flex-start" : "flex-end"
                }
              >
                <Box
                  sx={{
                    backgroundColor: theme.palette.primary.light,
                    py: 0.8,
                    pr: 2,
                    pl: 0.8,
                    borderRadius: "10px",
                  }}
                >
                  {message.content}
                </Box>
              </Box>
            ))}
            </Box>
          </Box>
          <MessageInput setMessageInputHeight={setMessageInputHeight} />
        </Box>
      </Box>
    </Grid>
  );
};
