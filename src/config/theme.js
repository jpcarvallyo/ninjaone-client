import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#002A42",
    },
    secondary: {
      main: "#f50057",
    },
    blue: {
      main: "#002A42",
      secondary: "#337AB7",
    },
    white: {
      main: "#FFFFFF",
    },
    black: {
      secondary: "#211F33",
    },
    red: {
      main: "#D53948",
      secondary: "#d32f2f",
    },
    grey: {
      main: "#48446940",
      secondary: "#48446940",
      contrast: "#F4F4F5",
      iconButton: "#E8E8EA",
      o3: "#6E6D7A",
    },
    warning: {
      main: "#D53948",
    },
  },
  typography: {
    fontFamily: "Inter, sans-serif",
    button: {
      fontSize: "14px",
      textTransform: "none",
    },
    listMenuItem: {
      fontSize: "14px",
    },
    inputError: {
      fontWeight: 400,
      fontSize: "12px",
      lineHeight: 1.66,
      textAlign: "left",
      margin: "3px 14px 6px 14px",
    },
    listHeading: {
      fontSize: "14px",
      fontWeight: 500,
      lineHeight: "16.94px",
    },
    deviceListItemPrimary: {
      fontWeight: 500,
      fontSize: "14px",
      lineHeight: "16.94px",
      textTransform: "uppercase",
    },
    deviceListItemSecondary: {
      fontWeight: 400,
      fontSize: "12px",
      lineHeight: "14.52px",
    },
    formInputLabel: {
      fontSize: "14px",
      fontWeight: 400,
      lineHeight: "21px",
    },
    h1: {
      fontSize: "20px",
      fontWeight: 500,
      lineHeight: "24.2px",
    },
    h2: {
      fontSize: "1.5rem",
      fontWeight: 600,
      lineHeight: 1.3,
    },
  },
});

export default theme;
