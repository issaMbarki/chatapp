import { createTheme } from "@mui/material/styles";

const lightMode = createTheme({
  palette: {
    mode: "light",
    listBackGround: { main: "#f5f5f5" ,hover:'#ffffff'},
    message: { main:"#42a5f5"}
  },
});

const darkMode = createTheme({
  palette: {
    mode: "dark",
    listBackGround: { main: "#2b2b2b",hover:'#515151' },
    message: { main:"#42a5f5"}
  },
});

export { lightMode, darkMode };
