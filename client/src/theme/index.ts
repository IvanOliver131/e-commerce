import { createTheme, Theme } from "@mui/material/styles";

export const shades = {
  primary: {
    100: "#dad5d3",
    200: "#b6aba7",
    300: "#91817c",
    400: "#6d5750",
    500: "#482d24",
    600: "#3a241d",
    700: "#2b1b16",
    800: "#1d120e",
    900: "#0e0907",
  },
  secondary: {
    100: "#f8f6f0",
    200: "#f2ede1",
    300: "#ebe5d3",
    400: "#e5dcc4",
    500: "#ded3b5",
    600: "#b2a991",
    700: "#857f6d",
    800: "#595448",
    900: "#2c2a24",
  },
  neutral: {
    100: "#f5f5f5",
    200: "#ecebeb",
    300: "#e2e1e1",
    400: "#d9d7d7",
    500: "#cfcdcd",
    600: "#a6a4a4",
    700: "#7c7b7b",
    800: "#535252",
    900: "#292929",
  },
};

export const theme: Theme = createTheme({
  palette: {
    primary: {
      main: shades.primary[500],
    },
    secondary: {
      main: shades.secondary[500],
    },
    neutral: {
      dark: shades.neutral[700],
      main: shades.neutral[500],
      light: shades.neutral[100],
    },
  },
  typography: {
    fontFamily: ["Fauna One", "sans-serif"].join(","),
    fontSize: 11,
    h1: {
      fontFamily: ["Cinzel", "sans-serif"].join(","),
      fontSize: 48,
    },
    h2: {
      fontFamily: ["Cinzel", "sans-serif"].join(","),
      fontSize: 36,
    },
    h3: {
      fontFamily: ["Cinzel", "sans-serif"].join(","),
      fontSize: 20,
    },
    h4: {
      fontFamily: ["Cinzel", "sans-serif"].join(","),
      fontSize: 14,
    },
  },
});
