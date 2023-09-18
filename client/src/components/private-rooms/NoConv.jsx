import { Grid, Typography } from "@mui/material";
import startConv from "../../assets/start_conv.svg";
import startConvDark from "../../assets/dark-mode/start_conv_dark.svg";
import { useTheme } from "@emotion/react";

export const NoConv = () => {
  const theme = useTheme();
  const currentTheme = theme.palette.mode;
  return (
    <Grid
      item
      sm={8}
      sx={{
        display: { xs: "none", sm: "flex" },
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 3,
      }}
    >
      <img
        src={currentTheme === "dark" ? startConvDark : startConv}
        alt="start conversation"
        style={{ width: "60%" }}
      />
      <Typography variant="h6" sx={{ textAlign: "center" }}>
        Welcome! Choose a room to begin your conversation.
      </Typography>
    </Grid>
  );
};
