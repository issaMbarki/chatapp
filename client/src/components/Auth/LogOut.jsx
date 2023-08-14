import { useQueryClient } from "react-query";
import { useLogOut } from "../../api/reactQuery";
import {  CircularProgress, ListItemIcon, MenuItem } from "@mui/material";
import {Logout} from '@mui/icons-material'
export default function LogOutMenuItem() {
  const queryClient = useQueryClient();
  const {
    mutate: logUserOut,
    isLoading,
    isError,
    error,
    isSuccess,
  } = useLogOut();
  const handleLogOut = () => {
    logUserOut();
  };
  if (isError) {
    return error.message;
  }
  if (isSuccess) {
    queryClient.invalidateQueries(["currentUser"]);
  }

  return (
    <MenuItem
      variant="text"
      disabled={isLoading}
      
      startIcon={isLoading && <CircularProgress size={20} />}
      onClick={handleLogOut}
    >
       <ListItemIcon>
       {isLoading ? <CircularProgress size={20} />:<Logout />} 
        </ListItemIcon>
      {isLoading ? "loging out..." : "log out"}
    </MenuItem>
  );
}
