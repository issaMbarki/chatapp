import { Avatar, CssBaseline, Paper, Box, Grid } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import SignIn from "../components/Auth/SignIn";
import SignUp from "../components/Auth/SignUp";
import home from "../assets/logo.svg";
import { useLocation } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { forwardRef, useEffect, useState } from "react";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Authentication({ formType }) {
  const location = useLocation();
  const[signedIn,setSignedIn]=useState(false)
  window.history.replaceState({}, document.title);
  useEffect(() => {
    if (location.state) {
      setSignedIn(true)
    }
  }, [location]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSignedIn(false);
  };

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          height: "100vh",
          backgroundImage: `url(${home})`,
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "contain",
          backgroundPosition: "center",
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          {formType === "signIn" ? <SignIn /> : <SignUp />}
        </Box>
      </Grid>
      <Snackbar open={signedIn} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Sign up successful. Please log in to access your account.
        </Alert>
      </Snackbar>
    </Grid>
  );
}
