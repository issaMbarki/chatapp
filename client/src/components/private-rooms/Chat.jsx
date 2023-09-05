import { Box, Grid, IconButton, Typography } from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import InfoOutlined from "@mui/icons-material/InfoOutlined";
import { useTheme } from "@emotion/react";

export const Chat = ({ currentRoom }) => {
  const roomParticipants=currentRoom.participants.map(participant=>participant.firstName);
  console.log(roomParticipants);
  const theme = useTheme();
  return (
    <Grid item xs={currentRoom ? 12 : 0} sm={8}>
      <Box
        sx={{
          p: 2,
          backgroundColor: theme.palette.listBackGround.main,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", gap: 1 }}>
          <IconButton sx={{ display: { xs: "inline-flex", sm: "none" } }}>
            <KeyboardBackspaceIcon />
          </IconButton>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography variant="h6">{currentRoom.roomName}</Typography>
            <Typography variant="subtitle2">you, AHmed, ussef</Typography>
          </Box>
        </Box>
        <IconButton sx={{ display: { xs: "inline-flex"}}}>
          <InfoOutlined />
        </IconButton>
      </Box>
    </Grid>
  );
};
