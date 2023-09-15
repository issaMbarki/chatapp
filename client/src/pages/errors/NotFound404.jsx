import { Box, Button, Typography } from "@mui/material";
import notFound from "../../assets/not_found.svg";
import notFoundDark from '../../assets/dark-mode/not_found_dark.svg'
import { useNavigate } from "react-router-dom";
export const NotFound404 = () => {
  const navigate = useNavigate();
const currentTheme =localStorage.getItem("theme")

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
        src={currentTheme==="dark"?notFoundDark: notFound}
        alt="error"
        style={{ maxWidth: "90vw", maxHeight: "75vh" }}
      />
      <Typography variant="h5">This page is not found</Typography>
      <Button variant="outlined" onClick={() => navigate("/")}>
        Back to home
      </Button>
    </Box>
  );
};
