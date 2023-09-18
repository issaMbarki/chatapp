import { Box, Typography, useTheme } from "@mui/material";
import startConv from "../../assets/start_conv.svg";
import startConvDark from "../../assets/dark-mode/start_conv_dark.svg";
export const NoMessages = () => {
  const theme = useTheme();
  const currentTheme = theme.palette.mode;
  return (
    <Box
      sx={{
        height:"60vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap:3
      }}
    >
      <img
        src={currentTheme === "dark" ? startConvDark : startConv}
        alt="start conversation"
        style={{ width: "50%" }}
      />
      <Typography variant="body1" sx={{ textAlign: "center" }}>
      No messages in this room yet.
      </Typography>
    </Box>
  );
};
