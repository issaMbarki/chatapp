import { useTheme } from "@emotion/react";
import { Box, Grid, Typography } from "@mui/material";
import { NoRooms } from "./NoRooms";
import { useGetRooms } from "../../api/reactQuery";
import { RoomsLoading } from "../loading/RoomsLoading";
import useLoader from "../../hooks/useLoader";
import OptionsMenu from "./OptionsMenu";
import SnackBar from "./SnackBar";
import { useContext, useState } from "react";
import { truncateString } from "../../utils/StringUtils";
import { UserContext } from "../../context/UserContext";
import TimeAgo from "react-timeago";
import ErrorSnackbar from "../error-handling/ErrorSnackbar";

export const Rooms = ({ setCurrentRoom, currentRoom }) => {
  const { _id: currentUserID } = useContext(UserContext);
  const theme = useTheme();
  const appBarHeight = theme.mixins.toolbar.minHeight;
  const contentHeight = `calc(98vh - ${appBarHeight}px)`;
  const { isLoading, data,isError,error } = useGetRooms();
  const rooms = data?.data;
  const showLoader = useLoader(isLoading, 600);

  const [open, setOpen] = useState(false);
  const handleCloseSnackBar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  if (isLoading || showLoader) {
    return <RoomsLoading contentHeight={contentHeight} />;
  }
  rooms.sort((a,b)=>{
    let timeA
    let timeB
    if (a?.lastMessage?.timestamp) {
     timeA= new Date(a.lastMessage.timestamp)
    }else{
      timeA= new Date(a.timestamp)
    }
    if (b?.lastMessage?.timestamp) {
      timeB= new Date(b.lastMessage.timestamp)
     }else{
       timeB= new Date(b.timestamp)
     }
    return timeB-timeA
})
  return (
    <Grid
      item
      xs={12}
      sm={4}
      sx={{ display: { xs: !currentRoom ? "block" : "none", sm: "block" } }}
    >
      <Box
        sx={{
          height: contentHeight,
          overflow: "auto",
          boxShadow: 1,
          borderRadius: 1,
          backgroundColor: theme.palette.listBackGround.main,
        }}
      >
        {rooms?.length === 0 ? (
          <NoRooms />
        ) : (
          rooms?.map((room) => (
            <Box
              key={room._id}
              sx={{
                display: "flex",
                // height: 80,
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0.8rem",
                borderBottom: "1px solid #ccc",
                "&:hover": {
                  backgroundColor: theme.palette.listBackGround.hover,
                  cursor: "pointer",
                },
              }}
              onClick={() => {
                setCurrentRoom(room);
              }}
            >
              <Box>
                <Typography variant="h6">
                  {truncateString(room.name, 25)}
                </Typography>
                {room?.lastMessage?.content ? (
                  <Typography variant="caption">
                    {room.lastMessageSender._id === currentUserID
                      ? "you: "
                      : room.lastMessageSender.firstName + ": "}
                    {truncateString(room.lastMessage.content, 20)}
                    {"·"}
                    <TimeAgo
                      date={room.lastMessage.timestamp}
                      minPeriod={60}
                      formatter={formatTimeAgo}
                    />
                  </Typography>
                ) : (
                  <Typography variant="caption">
                    Be the first to start a conversation in this room!
                    {"·"}
                    <TimeAgo
                      date={room.timestamp}
                      minPeriod={60}
                      formatter={formatTimeAgo}
                    />
                  </Typography>
                )}
              </Box>
              <OptionsMenu
                setCurrentRoom={setCurrentRoom}
                currentRoom={currentRoom}
                roomId={room._id}
                setOpen={setOpen}
              />
            </Box>
          ))
        )}
        {open && <SnackBar message="Room left !" open={open} setOpen={handleCloseSnackBar} />}
      </Box>
      {isError&&<ErrorSnackbar error={error} isError={isError}/>}
    </Grid>
  );
};

function formatTimeAgo(value, unit, suffix) {
  if (unit === "second") {
    return "Just now";
  } else if (unit === "minute") {
    return `${value} min`;
  } else if (unit === "hour") {
    return `${value} hr`;
  } else if (unit === "day") {
    return `${value} day`;
  } else {
    return `${value} ${unit}s`;
  }
}
