import { Button, CircularProgress } from "@mui/material";
import  { useState, useEffect } from "react";

export const ButtonLoad = ({ isLoading,text,loadingText, ...props }) => {
  const [showLoading, setShowLoading] = useState(false);
  useEffect(() => {
    if (isLoading) {
      setShowLoading(true);
       setTimeout(() => {
        setShowLoading(false);
      }, 1000); // Minimum loading time of 1 second
    }
  }, [isLoading]);

  return (
    <Button
      disabled={showLoading}
      startIcon={showLoading&& <CircularProgress size={20}/>}
      {...props}
    >
      {showLoading ? loadingText : text}
    </Button>
  );
};
