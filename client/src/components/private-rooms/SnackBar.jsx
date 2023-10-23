import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Slide } from "@mui/material";

function TransitionLeft(props) {
  return <Slide {...props} direction="right" />;
}
export default function SnackBar({ open, setOpen, message}) {

  const handleClose = (event) => {
    event?.stopPropagation();
    setOpen(false);
  };

  const action = (
    <>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );

  return (
    <div>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        TransitionComponent={TransitionLeft}
        message={message}
        action={action}
        onClick={(e)=>e.stopPropagation()}
      />
    </div>
  );
}
