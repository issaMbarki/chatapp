import { Button, CircularProgress } from "@mui/material";
import useLoader from "../../hooks/useLoader";

export const ButtonLoad = ({ isLoading,text,loadingText, ...props }) => {
  const showLoader = useLoader(isLoading, 1000);

  return (
    <Button
      disabled={showLoader}
      startIcon={showLoader&& <CircularProgress size={20}/>}
      {...props}
    >
      {showLoader ? loadingText : text}
    </Button>
  );
};
