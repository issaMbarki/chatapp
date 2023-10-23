import {
  Box,
  CircularProgress,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
// import InfoOutlined from "@mui/icons-material/InfoOutlined";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { useTheme } from "@emotion/react";
import { Participants } from "./Participants";
import { MessageInput } from "./MessageInput";
import { useEffect, useRef, useState, useContext } from "react";
import { SocketContext } from "../../context/SocketContext";
import { useGetMessages } from "../../api/reactQuery";
import { NoMessages } from "./NoMessages";
import useLoader from "../../hooks/useLoader";
import { Messages } from "./Messages";
import SnackBar from "./SnackBar";

export const Chat = ({ currentRoom, setCurrentRoom }) => {
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

  const { socket } = useContext(SocketContext);
  const [messages, setMessages] = useState([]);
  const { data, isLoading, isError } = useGetMessages(currentRoom._id);

  //initialize the messages from the server responde
  useEffect(() => {
    if (data && data.data) {
      setMessages(data.data);
    }
  }, [data]);

  //add new message to UI when the message arrived
  useEffect(() => {
    const addNewMessage = (newMessage) => {
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
    if (!isLoading && !showLoader) {
      chatBoxRef.current.scrollTop = chatBoxRef?.current?.scrollHeight;
    }
  }, [messageInputHeight, isLoading, showLoader]);
  const handleCProomCode=()=>{
    try {
      navigator.clipboard.writeText(currentRoom.code);
      setOpen(true);
    } catch (error) {
      console.log("error occurred while trying to copy code", error);
    }
  }
  const [open, setOpen] = useState(false);
  const handleCloseSnackBar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  if (isError) {
    return "error";
  }
  return (
    <Grid
      item
      sm={8}
      xs={12}
      sx={{ display: { xs: currentRoom ? "block" : "none", sm: "block" } }}
    >
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
            <IconButton
              sx={{ display: { xs: "inline-flex", sm: "none" } }}
              onClick={() => setCurrentRoom(null)}
            >
              <KeyboardBackspaceIcon />
            </IconButton>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography variant="h6">{currentRoom.name}</Typography>
              <Participants participants={currentRoom.participants} />
            </Box>
          </Box>
          <IconButton sx={{ display: { xs: "inline-flex" }, alignSelf:"center" }} onClick={handleCProomCode}>
            <PersonAddIcon />
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
              alignItems: isLoading || showLoader ? "center " : "",
              justifyContent: isLoading || showLoader ? "center" : "",
            }}
          >
            <Box>
              {isLoading || showLoader ? (
                <CircularProgress />
              ) : messages.length ? (
                <Messages messages={messages}/>
              ) : (
                <NoMessages />
              )}
            </Box>
          </Box>
          <MessageInput
            currentRoomId={currentRoom._id}
            setMessageInputHeight={setMessageInputHeight}
          />
        </Box> 
      </Box>
      {open && <SnackBar message="room code copied ✔️" open={open} setOpen={handleCloseSnackBar} />}
    </Grid>
  );
};
