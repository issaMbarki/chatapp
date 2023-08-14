import { createContext, useEffect, useState } from "react";
import { darkMode, lightMode } from "../utils/theme";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

export const ThemeContext = createContext({});

export function ThemeContextProvider({ children }) {
  const currentTheme =
    localStorage.getItem("theme") === "dark" ? darkMode: lightMode;
  const [theme, setTheme] = useState(currentTheme);
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === lightMode ? darkMode : lightMode));
  };
  useEffect(() => {
    localStorage.setItem("theme", theme===lightMode?'light':'dark');
  }, [theme]);
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}
