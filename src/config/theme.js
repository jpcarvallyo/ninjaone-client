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
  },
  typography: {
    fontFamily: "Inter, sans-serif",
    button: {
      fontSize: "14px",
      textTransform: "none",
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
