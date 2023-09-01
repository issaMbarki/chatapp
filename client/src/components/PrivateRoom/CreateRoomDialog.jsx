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
import InfoIcon from "@mui/icons-material/Info";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import Grid from "@mui/material/Grid";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { ClickAwayListener, Tooltip } from "@mui/material";
import { useCreateRooom } from "../../api/reactQuery";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function CreateRoomDialog({ open, setOpen }) {
  const [allowedUsers, setAllowedUsers] = useState(2);
  const [roomType, setRoomType] = useState("open");
  const [roomName,setRoomName]=useState('');
  const [Titleopen, setTitleOpen] = useState(false);
  const { mutate: createRoom, isLoading, data } = useCreateRooom();

  const handleAgree = () => {
    // Perform actions with allowedUsers, roomType and room name
    createRoom({ roomType, allowedUsers,roomName });
    setOpen(false);
  };
  const handleTooltipClose = () => {
    setTitleOpen(false);
  };

  const handleTooltipOpen = () => {
    setTitleOpen(true);
  };
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
          <ClickAwayListener onClickAway={handleTooltipClose}>
            <Tooltip
              PopperProps={{
                disablePortal: true,
              }}
              onClose={handleTooltipClose}
              open={Titleopen}
              disableFocusListener
              disableHoverListener
              disableTouchListener
              title={
                <>
                  Participants: Specify the maximum number of users allowed in
                  the room.
                  <br />
                  Room type: An open room allows anyone with room code to join,
                  while a locked room requires validation from you.
                  <br />
                  You can always change these settings after creating the room.
                </>
              }
            >
              <InfoIcon onClick={handleTooltipOpen} sx={{cursor:'pointer'}}>Click</InfoIcon>
            </Tooltip>
          </ClickAwayListener>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description"  component='div'>
            <Grid container spacing={3}>
              <Grid item display="flex" alignItems="center" xs={12}>
                <BorderColorIcon />
                <TextField
                sx={{ m: 1}}
                  required
                  label="Room name"
                  name="roomName"
                  autoFocus
                  fullWidth
                  value={roomName}
                  onChange={(e)=>{setRoomName(e.target.value)}}
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
                    onChange={(e) => setAllowedUsers(parseInt(e.target.value))}
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
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleAgree}>Create</Button>
        </DialogActions>
      </Dialog>
  );
}
