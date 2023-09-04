import { createTheme } from "@mui/material/styles";

const lightMode = createTheme({
  palette: {
    mode: "light",
    listBackGround: { main: "#f5f5f5" ,lighter:'#fcfcfc'},
  },
});

const darkMode = createTheme({
  palette: {
    mode: "dark",
    listBackGround: { main: "#2b2b2b" },
  },
});

export { lightMode, darkMode };
