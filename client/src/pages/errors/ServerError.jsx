import { Box, Button, Typography } from "@mui/material";
import serverError from "../../assets/server_down.svg";
import serverErrorDark from "../../assets/dark-mode/server_down_dark.svg";
export const ServerError = () => {
  const currentTheme = localStorage.getItem("theme");
  return (
    <Box
      sx={{
        height: "95vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 2,
      }}
    >
      <img
        src={currentTheme === "dark" ? serverErrorDark : serverError}
        alt="error"
        style={{ maxWidth: "90vw", maxHeight: "75vh" }}
      />
      <Typography variant="h5">
        Oops! We're experiencing some technical difficulties.
      </Typography>
      <Button variant="outlined" onClick={() => window.location.reload()}>
        Try again !
      </Button> 
    </Box>
  );
};
