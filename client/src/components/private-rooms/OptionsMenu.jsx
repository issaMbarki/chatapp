import { styled, alpha } from "@mui/material/styles";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import LogoutIcon from "@mui/icons-material/Logout";
import { CircularProgress, IconButton } from "@mui/material";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import { useEffect, useState } from "react";
import { useLeaveRoom } from "../../api/reactQuery";
import useLoader from "../../hooks/useLoader";

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

export default function OptionsMenu({
  currentRoom,
  setCurrentRoom,
  roomId,
  setOpen
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open2 = Boolean(anchorEl);
  const { mutate: leaveRoom, isLoading, isSuccess } = useLeaveRoom();
  const showLoader = useLoader(isLoading, 600);
  useEffect(()=>{
    if (isSuccess) {
      if (roomId === currentRoom?._id) {
        setCurrentRoom(null);
      }
      setOpen(true)
    }
  },[isSuccess,roomId,currentRoom,setOpen,setCurrentRoom])
  
  const handleClick = (event) => {
    console.log("menu clicked");
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (e) => {
    e.stopPropagation();
    setAnchorEl(null);
  };
  const handleLeaveRoom = (e) => {
    e.stopPropagation();
    leaveRoom({roomId})
  };

  return (
    <>
      <IconButton
        onClick={(e) => {
          handleClick(e);
        }}
      >
        <MoreVertOutlinedIcon />
      </IconButton>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          "aria-labelledby": "demo-customized-button",
        }}
        anchorEl={anchorEl}
        open={open2}
        onClose={handleClose}
      >
        <MenuItem onClick={handleLeaveRoom} disableRipple>
          {isLoading || showLoader ?<CircularProgress size={20}/>:<LogoutIcon />} 
          Leave
        </MenuItem>
      </StyledMenu>
    </>
  );
}
