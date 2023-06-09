import { createTheme } from "@mui/material/styles";

export const shades = {
  primary: {
    100: "#cccccc",
    200: "#999999",
    300: "#666666",
    400: "#333333",
    500: "#000000",
    600: "#000000",
    700: "#000000",
    800: "#000000",
    900: "#000000",
  },
  
  secondary: {
    100: "#c8e6c9",
    200: "#a5d6a7",
    300: "#81c784",
    400: "#66bb6a",
    500: "#4caf50",
    600: "#43a047",
    700: "#388e3c",
    800: "#2e7d32",
    900: "#1b5e20",
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

export const theme = createTheme({
  palette: {
    primary: {
      main: shades.primary[500],
    },
    secondary: {
      main: shades.secondary[600],
      second: shades.secondary[800],
    },
    neutral: {
      dark: shades.neutral[700],
      main: shades.neutral[500],
      light: shades.neutral[100],
    },
  },
  typography: {
    fontFamily: ["Roboto-Condensed", "sans-serif"].join(","),
    fontSize: 11,
    h1: {
      fontFamily: ["Roboto-Condensed", "sans-serif"].join(","),
      fontSize: 40,
    },
    h2: {
      fontFamily: ["Roboto-Condensed", "sans-serif"].join(","),
      fontSize: 36,
    },
    h3: {
      fontFamily: ["Roboto-Condensed", "sans-serif"].join(","),
      fontSize: 20,
    },
    h4: {
      fontFamily: ["Roboto-Condensed", "sans-serif"].join(","),
      fontSize: 14,
    },
  },
});