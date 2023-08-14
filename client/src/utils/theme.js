import { createTheme } from "@mui/material/styles";

const lightMode = createTheme({
  palette: {
    mode: "light",
    // Customize other aspects of the light mode theme
  },
});

const darkMode = createTheme({
  palette: {
    mode: "dark",
    // Customize other aspects of the dark mode theme
  },
});

export { lightMode, darkMode };
