import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { i18n } from "./utils";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./config/theme";
import { DevicePageProvider } from "./pages/Devices/DeviceContext";
import Devices from "./pages/Devices";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <DevicePageProvider>
        <Devices />
      </DevicePageProvider>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <ToastContainer />
      <RouterProvider router={router}>
        <i18n.I18nextProvider i18n={i18n}></i18n.I18nextProvider>
      </RouterProvider>
    </ThemeProvider>
  </React.StrictMode>
);
