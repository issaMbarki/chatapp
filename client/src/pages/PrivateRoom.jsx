import { Grid } from "@mui/material";
import { Rooms } from "../components/private-rooms/Rooms";
import { Chat } from "../components/private-rooms/Chat";
import { useState } from "react";
import { NoConv } from "../components/private-rooms/NoConv";

export default function PrivateRoom() {

  const [currentRoom, setCurrentRoom] = useState(null);

  return (
    <Grid container spacing={0.5}>
      <Rooms
        setCurrentRoom={setCurrentRoom}
        currentRoom={currentRoom}
      />
      {currentRoom ? (
        <Chat  currentRoom={currentRoom} />
      ) : (
       <NoConv />
      )}
    </Grid>
  );
}
