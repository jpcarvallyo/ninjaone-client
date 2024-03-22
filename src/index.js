import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { i18n } from "./utils";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./config/theme";
import Devices from "./pages/Devices";
import "./index.css";

// TODO: add error boundary

const router = createBrowserRouter([
  {
    path: "/",
    element: <Devices />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <RouterProvider router={router}>
        <i18n.I18nextProvider i18n={i18n}></i18n.I18nextProvider>
      </RouterProvider>
    </ThemeProvider>
  </React.StrictMode>
);
