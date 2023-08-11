import {
  Button,
  TextField,
  Box,
  Grid,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useSignUp } from "../../api/reactQuery";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { IsInvalidInput, checkEmptyFields } from "../../utils/checkInputs";
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
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState({});

  const {
    mutate: signUserUp,
    data,
    isLoading,
    isSuccess,
    error,
    isError,
  } = useSignUp();
  //handle inputs changes
  const handlChange = (e) => {
    const newForm = { ...formData };
    newForm[e.currentTarget.name] = e.currentTarget.value;
    setFormData(newForm);

    const newError = IsInvalidInput(e.currentTarget);
    setFormErrors({ ...formErrors, ...newError });
  };
  //handle form submit
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
    //check if the form has errors or an input is empty
    const emptyFields = checkEmptyFields(formData);
    setFormErrors((prevErrors) => ({ ...prevErrors, ...emptyFields }));
    if (
      Object.values(formErrors).some((value) => value !== null) ||
      Object.keys(emptyFields).length
    ) {
      return;
    }
    //send form data to the server
    signUserUp(formData);
  };
  useEffect(() => {
    if (isSuccess) {
      console.log(data);
    }
    if (isError) {
      const { username, email } = error?.response?.data;
      if (username && email) {
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          ...{ username, email },
        }));
      } else if (username) {
        setFormErrors((prevErrors) => ({ ...prevErrors, ...{ username } }));
      } else if (email) {
        setFormErrors((prevErrors) => ({ ...prevErrors, ...{ email } }));
      } else console.log(error);
    }
  }, [isSuccess, isLoading, isError, data, error]);

  return (
    <>
      <Typography component="h1" variant="h5">
        Sign up
      </Typography>
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              autoComplete="given-name"
              name="firstName"
              required
              fullWidth
              id="firstName"
              label="First Name"
              autoFocus
              error={!!formErrors.firstName}
              helperText={formErrors.firstName}
              onChange={handlChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              id="lastName"
              label="Last Name"
              name="lastName"
              autoComplete="family-name"
              onChange={handlChange}
              error={!!formErrors.lastName}
              helperText={formErrors.lastName}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="username"
              label="User Name"
              name="username"
              autoComplete="username"
              error={!!formErrors.username}
              helperText={formErrors.username}
              onChange={handlChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              error={!!formErrors.email}
              helperText={formErrors.email}
              onChange={handlChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="password"
              label="Password"
              type="text"
              id="password"
              autoComplete="new-password"
              error={!!formErrors.password}
              helperText={formErrors.password}
              onChange={handlChange}
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          disabled={isLoading}
          startIcon={isLoading && <CircularProgress size={20} />}
        >
          {isLoading ? "Signing up..." : "Sign Up"}
        </Button>

        <Grid container justifyContent="flex-end">
          <Grid item>
            <NavLink to="/">Already have an account? Sign in</NavLink>
          </Grid>
        </Grid>
        <Copyright sx={{ mt: 5 }} />
      </Box>
    </>
  );
}
