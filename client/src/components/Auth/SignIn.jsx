import {
  TextField,
  Box,
  Grid,
  Link,
  Typography,
} from "@mui/material";
import { useSignIn } from "../../api/reactQuery";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { IsInvalidInput, checkEmptyFields } from "../../utils/checkInputs";
import { ButtonLoad } from "../loading/ButtonLoad";
import ErrorSnackbar from "../error-handling/ErrorSnackbar";
// TODO remove, this demo shouldn't need to rFeset the theme.

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link component={NavLink} color="inherit" to="#">
        Website
      </Link>{" "}
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
  const { mutate: signUserIn, isLoading, error, isError } = useSignIn();

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
    //check if the form has errors or an input is empty
    const emptyFields = checkEmptyFields(formData);
    setFormErrors((prevErrors) => ({ ...prevErrors, ...emptyFields }));
    if (
      Object.values(formErrors).some((value) => value !== undefined) ||
      Object.keys(emptyFields).length
    ) {
      return;
    }
    signUserIn(formData);
  };

  useEffect(() => {
    if (isError &&error?.response?.data) {
      const { emailUsername, password } = error?.response?.data;
      setTimeout(() => {
        setFormErrors((prev) => ({ ...prev, ...{ emailUsername, password } }));        
      }, 700);
    }
  }, [isError, error]);

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
        {/* <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        /> */}
        <ButtonLoad
          isLoading={isLoading}
          text="Sign in"
          loadingText="Signing in"
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        />
        <Grid container>
          <Grid item xs>
            <Link component={NavLink} to="#">
              Forgot password?
            </Link>
          </Grid>
          <Grid item>
            <Link component={NavLink} to="/sign-up">
              Don't have an account? Sign Up
            </Link>
          </Grid>
        </Grid>
        <Copyright sx={{ mt: 5 }} />
      </Box>
      {isError&&<ErrorSnackbar error={error} isError={isError}/>}
    </>
  );
}
