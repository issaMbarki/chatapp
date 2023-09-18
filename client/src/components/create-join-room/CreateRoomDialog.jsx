import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Slide from "@mui/material/Slide";
import { forwardRef, useState } from "react";
// eslint-disable-next-line
import LockIcon from "@mui/icons-material/Lock";
import PeopleIcon from "@mui/icons-material/People";
import InfoOutlined from "@mui/icons-material/InfoOutlined";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import Grid from "@mui/material/Grid";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { ClickAwayListener, Tooltip } from "@mui/material";
import { useCreateRooom } from "../../api/reactQuery";
import { checkRoomName } from "../../utils/checkInputs";
import { ButtonLoad } from "../loading/ButtonLoad";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function CreateRoomDialog({ open, setOpen }) {
  const [allowedUsers, setAllowedUsers] = useState(2);
  const [roomName, setRoomName] = useState("");
  const [Titleopen, setTitleOpen] = useState(false);
  const [roomError, setRoomError] = useState("");

  const { mutate: createRoom, isLoading, isError } = useCreateRooom();
  const handleCreateRoom = (e) => {
    e.preventDefault();
    const error = checkRoomName(roomName);
    if (error) {
      setRoomError(error);
      return;
    }
    createRoom({ allowedUsers, name: roomName });
  };

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
        <ClickAwayListener onClickAway={() => setTitleOpen(false)}>
          <Tooltip
            PopperProps={{
              disablePortal: true,
            }}
            onClose={() => setTitleOpen(false)}
            open={Titleopen}
            disableFocusListener
            disableHoverListener
            disableTouchListener
            title={
              <>
                Participants: Specify the maximum number of users allowed in the
                room.
                <br />
                You can always change this setting after creating the room.
              </>
            }
          >
            <InfoOutlined
              onClick={() => setTitleOpen(true)}
              sx={{ cursor: "pointer" }}
            >
              Click
            </InfoOutlined>
          </Tooltip>
        </ClickAwayListener>
      </DialogTitle>
      <DialogContent sx={{ pb: 0 }}>
        <DialogContentText id="alert-dialog-slide-description" component="div">
          <Grid container spacing={2}>
            <Grid item display="flex" alignItems="center" xs={12} sm={6}>
              <BorderColorIcon />
              <TextField
                sx={{ m: 1 }}
                label="Room name"
                name="roomName"
                autoFocus
                value={roomName}
                error={!!roomError}
                helperText={roomError}
                onChange={(e) => {
                  setRoomName(e.target.value);
                  setRoomError("");
                }}
              />
            </Grid>
            <Grid item display="flex" alignItems="center" xs={12} sm={6}>
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
          </Grid>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button sx={{ color: "#bebebe" }} onClick={() => setOpen(false)}>
          Cancel
        </Button>
        <ButtonLoad
          isLoading={isLoading}
          text="Create"
          loadingText="Creating"
          onClick={handleCreateRoom}
        />
      </DialogActions>
    </Dialog>
  );
}
