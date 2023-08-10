import {
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Box,
  Grid,
  Typography,
} from "@mui/material";
import { useSignIn, useSignUp } from "../../api/reactQuery";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { IsInvalidInput } from "../../utils/checkInputs";
// TODO remove, this demo shouldn't need to reset the theme.

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <NavLink color="inherit" href="https://mui.com/">
        Your Website
      </NavLink>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
export default function SignInSide() {
  const [formData, setFormData] = useState({
    emailUsername: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const {
    mutate: signUserIn,
    data,
    isLoading,
    isSuccess,
    error,
    isError,
  } = useSignIn();
  //handle inputs changes
  const handlChange = (e) => {
    const newForm = { ...formData };
    newForm[e.currentTarget.name] = e.currentTarget.value;
    setFormData(newForm);
    const newError = IsInvalidInput(e.currentTarget);
    setFormErrors({ ...formErrors, ...newError });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const formData = {
      email: data.get("email"),
      password: data.get("password"),
    };
    // signUserIn(formData);
  };

  return (
    <>
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          label="Email Address or username"
          name="emailUsername"
          autoComplete="email"
          autoFocus
          value={formData.emailUsername}
          error={!!formErrors.emailUsername}
          helperText={formErrors.emailUsername}
          onChange={handlChange}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          value={formData.password}
          error={!!formErrors.password}
          helperText={formErrors.password}
          onChange={handlChange}
        />
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign In
        </Button>
        <Grid container>
          <Grid item xs>
            <NavLink href="#" variant="body2">
              Forgot password?
            </NavLink>
          </Grid>
          <Grid item>
            <NavLink to="/sign-up">Don't have an account? Sign Up</NavLink>
          </Grid>
        </Grid>
        <Copyright sx={{ mt: 5 }} />
      </Box>
    </>
  );
}
