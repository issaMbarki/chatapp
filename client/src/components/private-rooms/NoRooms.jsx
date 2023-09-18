import { Box, Link, Typography, useTheme } from "@mui/material";
import noRoom from "../../assets/no_room.svg";
import noRoomDark from "../../assets/dark-mode/no_room_dark.svg";

import { NavLink } from "react-router-dom";
export const NoRooms = () => {
    const theme = useTheme();
  const currentThem=theme.palette.mode
  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 3,
      }}
    >
      <img src={currentThem==="dark"?noRoomDark:noRoom} alt="no rooms" style={{ width: "50%" }} />
      <Typography variant="body1" sx={{ textAlign: "center" }}>
  You are currently not in any rooms. To join an existing room or create a new one, please&nbsp;
  <Link
    component={NavLink}
    to="/join-create"
    sx={{ fontWeight: "bold" }}
  >
    click here
  </Link>.
</Typography>
    </Box>
  );
};
