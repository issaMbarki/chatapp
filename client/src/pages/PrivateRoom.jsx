import { Grid } from "@mui/material";
import { useGetRooms } from "../api/reactQuery";
import { Rooms } from "../components/private-rooms/Rooms";
import { Chat } from "../components/private-rooms/Chat";
import { useState } from "react";
export default function PrivateRoom() {

  const { isLoading, data } = useGetRooms();
  const rooms = data?.data;
  const [currentRoom, setCurrentRoom] = useState(null);
  if (isLoading) {
    return "wait....";
  }
  return (
    <Grid container spacing={0.5}>
      <Rooms
        rooms={rooms}
        setCurrentRoom={setCurrentRoom}
        currentRoom={currentRoom}
      />
      {currentRoom ? (
        <Chat rooms={rooms} currentRoom={currentRoom} />
      ) : (
        "no current room"
      )}
    </Grid>
  );
}
