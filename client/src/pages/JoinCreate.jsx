import {
  Box,
  Button,
  FormHelperText,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import home from "../assets/home.svg";
import homeDark from "../assets/dark-mode/home_dark.svg";
import { useEffect, useState } from "react";
import CreateRoomDialog from "../components/create-join-room/CreateRoomDialog";
import { useJoinRoom } from "../api/reactQuery";
import { checkRoomIdInput } from "../utils/checkInputs";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { ButtonLoad } from "../components/loading/ButtonLoad";
import { useTheme } from "@emotion/react";

export default function PrivateRoom() {
  //I seperated the server error message and invalid input message , for better UX
  const [roomError, setRoomError] = useState({
    serverError: "",
    inputError: "",
  });
  const theme = useTheme();
  const currentThem=theme.palette.mode
  const [open, setOpen] = useState(false);
  const [roomCode, setRoomCode] = useState("");
  const { mutate: joinRoom, isLoading, isError, error } = useJoinRoom();
  const handleJoinRoom = (e) => {
    e.preventDefault();
    const error = checkRoomIdInput(roomCode);
    if (error) {
      setRoomError({ inputError: error });
      return;
    }
    joinRoom({ code: roomCode });
  };

  useEffect(() => {
    if (isError&&error?.response?.data) {   
        const { message } = error.response.data;
        setTimeout(() => {
          setRoomError({ serverError: message });
        }, 700);  
    }
  }, [isError, error]);
  // TODO: handle error
  return (
    <>
      <Grid
        container
        spacing={0}
        sx={{
          direction: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundImage: `url(${currentThem==="dark"?homeDark:home})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "contain",
          backgroundPosition: "left",
          minHeight: "90vh",
        }}
      >
        <Grid item>
          <Paper elevation={3} sx={{ padding: "2rem", maxWidth: "400px" }}>
            <Typography variant="h6" gutterBottom component="span">
              Private Room
            </Typography>
            <Typography variant="body1" gutterBottom component="div">
              Enter the room code below to join an existing room, or create a
              new room.
            </Typography>
            <Box component="form">
              <TextField
                sx={{ mt: 1 }}
                label="Room Code"
                variant="outlined"
                fullWidth
                autoFocus
                placeholder="e.g. aB1cD23"
                value={roomCode}
                error={!!roomError?.inputError}
                helperText={roomError?.inputError}
                onChange={(e) => {
                  setRoomCode(e.target.value);
                  setRoomError({});
                }}
              />
              {roomError?.serverError && (
                <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                  <InfoOutlinedIcon />
                  <FormHelperText variant="outlined" sx={{ ml: 1 }}>
                    {roomError.serverError}
                  </FormHelperText>
                </Box>
              )}
              <ButtonLoad
                isLoading={isLoading}
                text="Join Room"
                loadingText="Joining"
                type="submit"
                variant="contained"
                sx={{ mt: "1rem", mr: "1rem" }}
                onClick={handleJoinRoom}
              />
              <Button
                variant="outlined"
                sx={{ mt: "1rem" }}
                onClick={() => setOpen(true)}
              >
                Create New Room
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
      {open && <CreateRoomDialog open={open} setOpen={setOpen} />}
    </>
  );
}
