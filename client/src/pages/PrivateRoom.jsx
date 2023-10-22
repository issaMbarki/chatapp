import { Grid } from "@mui/material";
import { Rooms } from "../components/private-rooms/Rooms";
import { Chat } from "../components/private-rooms/Chat";
import { useEffect, useState } from "react";
import { NoConv } from "../components/private-rooms/NoConv";
import { useLocation } from "react-router-dom";

export default function PrivateRoom() {
  const [currentRoom, setCurrentRoom] = useState(null);
  const location = useLocation();
  window.history.replaceState({}, document.title);
  useEffect(() => {
    if (location.state) {
      const { newJoinedRoom } = location.state;
      setTimeout(() => {
        setCurrentRoom(newJoinedRoom);
      }, 600);
    }
  }, [location]);
  return (
    <Grid container spacing={0.5}>
      <Rooms setCurrentRoom={setCurrentRoom} currentRoom={currentRoom} />
      {currentRoom ? <Chat currentRoom={currentRoom} setCurrentRoom={setCurrentRoom}/> : <NoConv />}
    </Grid>
  );
}
