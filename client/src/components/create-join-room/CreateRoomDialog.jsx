import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Slide from "@mui/material/Slide";
import { forwardRef, useState } from "react";
import LockIcon from "@mui/icons-material/Lock";
import PeopleIcon from "@mui/icons-material/People";
import InfoOutlined from "@mui/icons-material/InfoOutlined";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import Grid from "@mui/material/Grid";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import {
  Box,
  CircularProgress,
  ClickAwayListener,
  Tooltip,
} from "@mui/material";
import { useCreateRooom } from "../../api/reactQuery";
import { checkRoomName } from "../../utils/checkInputs";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function CreateRoomDialog({ open, setOpen }) {
  const [allowedUsers, setAllowedUsers] = useState(2);
  const [roomType, setRoomType] = useState("open");
  const [roomName, setRoomName] = useState("");
  const [Titleopen, setTitleOpen] = useState(false);
  const [roomError, setRoomError] = useState("");

  const {
    mutate: createRoom,
    isLoading,
    isError,
    isSuccess,
  } = useCreateRooom();

  const handleCreateRoom = (e) => {
    e.preventDefault();
    const error = checkRoomName(roomName);
    if (error) {
      setRoomError(error);
      return;
    }
    createRoom({ type: roomType, allowedUsers, name: roomName });
  };

  if (isSuccess) {
  
  }
  if (isError) {
    return "error";
  }
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={() => {
        setOpen(false);
      }}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle display="flex" alignItems="center" gap="1rem">
        Create new private room
        <ClickAwayListener onClickAway={()=>setTitleOpen(false)}>
          <Tooltip
            PopperProps={{
              disablePortal: true,
            }}
            onClose={()=>setTitleOpen(false)}
            open={Titleopen}
            disableFocusListener
            disableHoverListener
            disableTouchListener
            title={
              <>
                Participants: Specify the maximum number of users allowed in the
                room.
                <br />
                Room type: An open room allows anyone with room code to join,
                while a locked room requires validation from you.
                <br />
                You can always change these settings after creating the room.
              </>
            }
          >
            <InfoOutlined
              onClick={()=>setTitleOpen(true)}
              sx={{ cursor: "pointer" }}
            >
              Click
            </InfoOutlined>
          </Tooltip>
        </ClickAwayListener>
      </DialogTitle>
      <DialogContent sx={{ pb: 0 }}>
        <DialogContentText id="alert-dialog-slide-description" component="div">
          <Grid container spacing={3}>
            <Grid item display="flex" alignItems="center" xs={12}>
              <BorderColorIcon />
              <TextField
                sx={{ m: 1 }}
                label="Room name"
                name="roomName"
                autoFocus
                fullWidth
                value={roomName}
                onChange={(e) => {
                  setRoomName(e.target.value);
                }}
              />
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item display="flex" alignItems="center">
              <PeopleIcon />
              <FormControl sx={{ m: 1, minWidth: 150 }}>
                <InputLabel id="participants">Participants</InputLabel>
                <Select
                  labelId="participants"
                  label="Participants"
                  value={allowedUsers}
                  onChange={(e) => setAllowedUsers(e.target.value)}
                >
                  <MenuItem value="2">2</MenuItem>
                  <MenuItem value="3">3</MenuItem>
                  <MenuItem value="4">4</MenuItem>
                  <MenuItem value="5">5</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item display="flex" alignItems="center">
              <LockIcon />
              <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="room-type">Room type</InputLabel>
                <Select
                  labelId="room-type"
                  label="Room type"
                  value={roomType}
                  onChange={(e) => setRoomType(e.target.value)}
                >
                  <MenuItem value="open">Open</MenuItem>
                  <MenuItem value="locked">Locked</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button sx={{ color: "#bebebe" }} onClick={() => setOpen(false)}>
          Cancel
        </Button>
        <Button
          disabled={isLoading}
          startIcon={isLoading && <CircularProgress size={20} />}
          onClick={handleCreateRoom}
        >
          {isLoading ? "Creating" : "Create"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
