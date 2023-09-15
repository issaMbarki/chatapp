import { useLogOut } from "../../api/reactQuery";
import { CircularProgress, ListItemIcon, MenuItem } from "@mui/material";
import { Logout } from "@mui/icons-material";
export default function LogOutMenuItem() {
  const {
    mutate: logUserOut,
    isLoading,
    isError,
    error,
  } = useLogOut();
  const handleLogOut = () => {
    logUserOut();
  };
  if (isError) {
    return error.message;
  }

  return (
    <MenuItem variant="text" disabled={isLoading} onClick={handleLogOut}>
      <ListItemIcon>
        {isLoading ? <CircularProgress size={20} /> : <Logout />}
      </ListItemIcon>
      {isLoading ? "loging out..." : "log out"}
    </MenuItem>
  );
}
