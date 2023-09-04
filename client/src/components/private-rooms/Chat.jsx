import { Box, Grid, IconButton, Typography } from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useTheme } from "@emotion/react";

export const Chat = ({ currentRoom }) => {
  const theme = useTheme();
  return (
    <Grid item xs={0} sm={8}> 
      <Box sx={{ p: 2, backgroundColor: theme.palette.listBackGround.lighter, }}>
        <IconButton sx={{ display: { sm: "none", xs: "inline-flex" } }}>
          <KeyboardBackspaceIcon />
        </IconButton>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography variant="h6">{currentRoom.roomName}</Typography>
          <Typography variant="subtitle2">you, AHmed, ussef</Typography>
        </Box>
      </Box>
    </Grid>
  );
};
