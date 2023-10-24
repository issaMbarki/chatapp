import { TextField, Box, Grid, Typography, Link } from "@mui/material";
import { useSignUp } from "../../api/reactQuery";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { IsInvalidInput, checkEmptyFields } from "../../utils/checkInputs";
import { ButtonLoad } from "../loading/ButtonLoad";
import ErrorSnackbar from "../error-handling/ErrorSnackbar";

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
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState({});

  const { mutate: signUserUp, data, isLoading, error, isError } = useSignUp();
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
    //check if the form has errors or an input is empty
    const emptyFields = checkEmptyFields(formData);
    setFormErrors((prevErrors) => ({ ...prevErrors, ...emptyFields }));
    if (
      Object.values(formErrors).some((value) => value !== undefined) ||
      Object.keys(emptyFields).length
    ) {
      return;
    }
    //send form data to the server
    signUserUp(formData);
  };
  useEffect(() => {
    if (isError && error?.response?.data) {
      const { username, email } = error?.response?.data;
      setTimeout(() => {
        setFormErrors((prevErrors) => ({ ...prevErrors, username, email }));
      }, 700);
    }
  }, [isLoading, isError, data, error]);

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
        <ButtonLoad
          isLoading={isLoading}
          text="Sign up"
          loadingText="Signing up"
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        />
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Link component={NavLink} to="/">
              Already have an account? Sign in
            </Link>
          </Grid>
        </Grid>
        <Copyright sx={{ mt: 5 }} />
      </Box>
      {isError&&<ErrorSnackbar error={error} isError={isError}/>}
    </>
  );
}
