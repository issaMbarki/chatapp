import {
  Box,
  Button,
  CircularProgress,
  FormHelperText,
  Grid,
  IconButton,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import home from "../assets/home.svg";
import { useEffect, useState } from "react";
import CreateRoomDialog from "../components/create-join-room/CreateRoomDialog";
import { useJoinRoom } from "../api/reactQuery";
import { checkRoomIdInput } from "../utils/checkInputs";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

export default function PrivateRoom() {
  //I seperated the server error message and invalid input message , for better UX
  const [roomError, setRoomError] = useState({
    serverError: "",
    inputError: "",
  });
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
    if (isError) {
      if (error?.response?.data) {
        const { message } = error.response.data;
        setRoomError({ serverError: message });
      } else {
        // TODO: handle error
      }
    }
  }, [isError, error]);

  return (
    <>
      <Grid
        container
        spacing={0}
        sx={{
          direction: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundImage: `url(${home})`,
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
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <IconButton>
                    <InfoOutlinedIcon />
                  </IconButton>
                  <FormHelperText variant="outlined" sx={{ ml: 0.5 }}>
                    {roomError.serverError}
                  </FormHelperText>
                </Box>
              )}

              <Button
                type="submit"
                variant="contained"
                sx={{ mt: "1rem", mr: "1rem" }}
                onClick={handleJoinRoom}
                disabled={isLoading}
                startIcon={isLoading && <CircularProgress size={20} />}
              >
                {isLoading ? "Joining" : "Join Room"}
              </Button>
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
