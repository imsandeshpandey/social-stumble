import { createTheme, ThemeProvider } from "@mui/material";
import React, { createContext, useContext, useEffect, useState } from "react";
import { themeMode } from "./theme";

const ThemeUpdateContext = createContext();
export const useToggleTheme = () => useContext(ThemeUpdateContext);

const Themer = ({ children }) => {
  const [dark, setdark] = useState(true);
  const toggleTheme = () => {
    setdark(!dark);
  };

  useEffect(() => {
    setdark(JSON.parse(window.localStorage.getItem("dark")));
  }, []);

  useEffect(() => {
    window.localStorage.setItem("dark", dark);
  }, [dark]);

  const theme = createTheme(themeMode(dark ? "dark" : "light"));
  return (
    <ThemeUpdateContext.Provider value={toggleTheme}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeUpdateContext.Provider>
  );
};

export default Themer;
