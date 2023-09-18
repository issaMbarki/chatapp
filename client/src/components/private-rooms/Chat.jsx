import { Box, CircularProgress, Grid, IconButton, Typography } from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import InfoOutlined from "@mui/icons-material/InfoOutlined";
import { useTheme } from "@emotion/react";
import { Participants } from "./Participants";
import { MessageInput } from "./MessageInput";
import { useEffect, useRef, useState, useContext } from "react";
import { SocketContext } from "../../context/SocketContext";
import { useGetMessages } from "../../api/reactQuery";
import { UserContext } from "../../context/UserContext";
import { NoMessages } from "./NoMessages";
import useLoader from "../../hooks/useLoader";

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

  const {_id:currentUser}=useContext(UserContext)
  const { socket } = useContext(SocketContext);
  const [messages, setMessages] = useState([]);
  const { data, isLoading, isError } = useGetMessages(currentRoom._id);

  //initialize the messages from the server responde
  useEffect(() => {
    if (data && data.data) {
      setMessages(data.data);
    }
  }, [data]);

  //add new meesage to UI when the message arrived
  useEffect(() => {
    const addNewMessage = (newMessage) => {
      console.log(newMessage);
      setMessages((prev) => [...prev, newMessage]);
    };
    socket.on("new-message", addNewMessage);
    return () => {
      socket.off("new-message", addNewMessage);
    };
  }, [socket, messages]);

  const showLoader = useLoader(isLoading, 600);
  // Scroll to the end of the chat box when the component is rendered or when the box resized
  useEffect(() => {
    if (!isLoading&&!showLoader) {
      chatBoxRef.current.scrollTop = chatBoxRef?.current?.scrollHeight;
    }
  }, [messageInputHeight, isLoading,showLoader]);

  if (isError) {
    return "error";
  }
  return (
    <Grid item sm={8} xs={12}  sx={{ display: { xs: currentRoom ? "block" : "none",sm:"block" } }}>
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
            className="chat-box"
            ref={chatBoxRef}
            sx={{
              height: chatBoxHeight,
              overflow: "auto",
              display: "flex",
              flexDirection: "column-reverse",
              alignItems:isLoading||showLoader?"center ":"",
              justifyContent:isLoading||showLoader?"center":""
            }}
          >
            <Box>
              {isLoading||showLoader?<CircularProgress />: messages.length
                ? messages.map((message) => (
                    <Box
                      key={message._id}
                      p={0.8}
                      display="flex"
                      justifyContent={
                        message.sender !== currentUser ? "flex-start" : "flex-end"
                      }
                    >
                      <Box
                        sx={{
                          backgroundColor:  message.sender === currentUser ? theme.palette.primary.light:theme.palette.listBackGround.main,
                          py: 0.8,
                          pr: 2,
                          pl: 0.8,
                          borderRadius: "10px",
                        }}
                      >
                        {message.content}
                      </Box>
                    </Box>
                  ))
                : <NoMessages/>}
            </Box>
          </Box>
          <MessageInput currentRoomId={currentRoom._id} setMessageInputHeight={setMessageInputHeight} />
        </Box>
      </Box>
    </Grid>
  );
};
