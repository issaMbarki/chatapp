import { useLogOut } from "../../api/reactQuery";
import { CircularProgress, ListItemIcon, MenuItem } from "@mui/material";
import { Logout } from "@mui/icons-material";
import useLoader from "../../hooks/useLoader";
export default function LogOutMenuItem() {
  const {
    mutate: logUserOut,
    isLoading,
    isError,
    error,
  } = useLogOut();
  const showLoader = useLoader(isLoading, 1000);
  const handleLogOut = () => {
    logUserOut();
  };
  if (isError) {
    return error.message;
  }

  return (
    <MenuItem variant="text" disabled={isLoading||showLoader} onClick={handleLogOut}>
      <ListItemIcon>
        {isLoading||showLoader ? <CircularProgress size={20} /> : <Logout />}
      </ListItemIcon>
      {isLoading||showLoader ? "loging out..." : "log out"}
    </MenuItem>
  );
}
