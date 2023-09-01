import { useTheme } from "@emotion/react";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import { Box, Grid, IconButton, Typography } from "@mui/material";
import { useEffect } from "react";
import { useGetRooms } from "../api/reactQuery";

const conversationsData = [
  {
    id: 1,
    name: "John Doe",
    lastMessage: "Hey, how are you?",
  },
  {
    id: 2,
    name: "Jane Smith",
    lastMessage: "Did you watch the movie?",
  },
  {
    id: 4,
    name: "David Johnson",
    lastMessage: "Let's meet tomorrow.",
  },
  {
    id: 5,
    name: "David Johnson",
    lastMessage: "Let's meet tomorrow.",
  },
  {
    id: 6,
    name: "David Johnson",
    lastMessage: "Let's meet tomorrow.",
  },
  {
    id: 7,
    name: "David Johnson",
    lastMessage: "Let's meet tomorrow.",
  },
  {
    id: 8,
    name: "David Johnson",
    lastMessage: "Let's meet tomorrow.",
  },
  {
    id: 9,
    name: "David Johnson",
    lastMessage: "Let's meet tomorrow.",
  },
  {
    id: 10,
    name: "David Johnson",
    lastMessage: "Let's meet tomorrow.",
  },
  {
    id: 11,
    name: "David Johnson",
    lastMessage: "Let's meet tomorrow.",
  },
  {
    id: 12,
    name: "David Johnson",
    lastMessage: "Let's meet tomorrow.",
  },
];

export default function PrivateRoom() {
  const theme = useTheme();
  const { isLoading, isError, data } = useGetRooms();
  const rooms=data?.data
  console.log(rooms);
  const appBarHeight = theme.mixins.toolbar.minHeight;
  const contentMaxHeight = `calc(98vh - ${appBarHeight}px)`;
  if (isLoading) {
    return'wait....'
  }
  return (
    <Grid container>
      <Grid
        item
        xs={12}
        sm={3}
        sx={{ maxHeight: contentMaxHeight, overflow: "auto" }}
      >
        {rooms.map((room) => (
          <Box
            key={room._id}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: 2,
              borderBottom: "1px solid #ccc",
              "&:hover": {
                backgroundColor: "#f5f5f5",
                cursor: "pointer",
              },
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              {room.roomName}
            </Typography>
            <IconButton>
              <MoreVertOutlinedIcon />
            </IconButton>
          </Box>
        ))}
      </Grid>
    </Grid>
  );
}
