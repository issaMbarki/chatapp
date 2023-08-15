import { Avatar, CssBaseline, Paper, Box, Grid } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import SignIn from "../components/Auth/SignIn";
import SignUp from "../components/Auth/SignUp";
import home from "../assets/logo.svg";


export default function Authentication({formType}) {
  return (
  
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
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
            {formType==='signIn'?<SignIn/>:<SignUp />}
            
          </Box>
        </Grid>
      </Grid>
  
  );
}
