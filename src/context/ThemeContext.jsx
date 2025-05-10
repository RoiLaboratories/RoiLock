import React, { createContext, useState, useContext, useEffect } from "react";

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
      setDarkMode(true);
    } else if (savedTheme === "light") {
      setDarkMode(false);
    } else {
      setDarkMode(false);
    }
  }, []);

  useEffect(() => {
    const html = document.documentElement;

    if (darkMode === true) {
      html.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      html.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  const setThemeMode = (mode) => {
    setDarkMode(mode);
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode, setThemeMode }}>
      {children}
    </ThemeContext.Provider>
  );
};
