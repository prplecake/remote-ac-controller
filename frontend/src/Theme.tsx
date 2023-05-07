// https://stackoverflow.com/questions/61117608/how-do-i-set-system-preference-dark-mode-in-a-react-app-but-also-allow-users-to/61119008#61119008

import React, { useState, useLayoutEffect } from "react";

export const ThemeContext = React.createContext({
  dark: false
});

export default function ThemeProvider({ children }: any) {
  // keeps state of the current theme
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  const [dark, setDark] = useState(prefersDark);

  // paints the app before it renders elements
  useLayoutEffect(() => {
    // Media Hook to check what theme user prefers
    applyTheme();
    // if state changes, repaints the app
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dark]);

  // rewrites set of css variablels/colors
  const applyTheme = () => {
    const root = document.getElementsByTagName("html")[0];
    root.setAttribute('data-bs-theme', dark ? 'dark' : 'light');
  };

  const toggle = () => {
    console.log("Toggle Method Called");

    // A smooth transition on theme switch
    const body = document.getElementsByTagName("body")[0];
    body.style.cssText = "transition: background .5s ease";

    setDark(!dark);
  };

  return (
    <ThemeContext.Provider
      value={{
        dark
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
