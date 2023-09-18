import {  Grid, Typography } from "@mui/material";
import startConv from "../../assets/start_conv.svg";

export const NoConv = () => {
  return (
    <Grid
      item
      sm={8}
      sx={{
        display: { xs:"none",sm:"flex" },
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 3,
      }}
    >
      <img src={startConv} alt="start conversation" style={{ width: "60%" }} />
      <Typography variant="h6" sx={{ textAlign: "center" }}>
        Welcome! Choose a room to begin your conversation.
      </Typography>
    </Grid>
  );
};
