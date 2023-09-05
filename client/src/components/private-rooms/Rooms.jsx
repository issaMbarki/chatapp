import { useTheme } from "@emotion/react";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import { Box, Grid, IconButton, Typography } from "@mui/material";
export const Rooms = ({ rooms, setCurrentRoom, currentRoom }) => {
  const theme = useTheme();
  const appBarHeight = theme.mixins.toolbar.minHeight;
  const contentHeight = `calc(98vh - ${appBarHeight}px)`;

  return (
    <Grid
      item
      xs={12}
      sm={4}
      sx={{ display: { xs: currentRoom ? "none" : "block", sm: "block" } }}
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
                backgroundColor: "#fcfcfc",
                cursor: "pointer",
              },
            }}
            onClick={() => setCurrentRoom(room)}
          >
            <Typography variant="h6" width={80}>
              {room.roomName}
            </Typography>
            <Typography
              variant="subtitle2"
              sx={{ flexGrow: 1, ml: "1rem", alignSelf: "end" }}
            >
              {room?.lastMessage}
            </Typography>
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                console.log("fhfh");
              }}
            >
              <MoreVertOutlinedIcon />
            </IconButton>
          </Box>
        ))}
      </Box>
    </Grid>
  );
};
