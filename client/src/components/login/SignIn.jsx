import {
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Box,
  Grid,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useSignIn } from "../../api/reactQuery";
import { NavLink } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { IsInvalidInput } from "../../utils/checkInputs";
import { UserContext } from "../../context/UserContext";
import { useQueryClient } from "react-query";
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
  const queryClient = useQueryClient();

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
    signUserIn(formData);
  };

  if (isSuccess) {
    queryClient.invalidateQueries(["currentUser"]);
  }
  if (isError) {
    const { emailUsername, password } = error?.response?.data;
    setFormErrors((prev) => ({ ...prev, ...{ emailUsername, password } }));
  }
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
          disabled={isLoading}
          startIcon={isLoading && <CircularProgress size={20} />}
        >
          {isLoading ? "signing in..." : "sign in"}
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
