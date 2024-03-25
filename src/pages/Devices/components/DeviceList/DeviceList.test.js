import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import DeviceList from "./index";
import { ThemeProvider } from "@mui/material/styles";
import theme from "config/theme";
import { I18nextProvider } from "react-i18next";
import { i18n } from "utils/";
import { DevicePageProvider } from "../../DeviceContext";

describe("DeviceList", () => {
  test("renders loading skeleton when loading is true", () => {
    const testOverrides = {
      loading: true,
      sortedAndFilteredDeviceList: [],
    };

    render(
      <ThemeProvider theme={theme}>
        <I18nextProvider i18n={i18n}>
          <DevicePageProvider testOverrides={testOverrides}>
            <DeviceList />
          </DevicePageProvider>
        </I18nextProvider>
      </ThemeProvider>
    );

    expect(screen.getByTestId("loading-skeleton")).toBeInTheDocument();
  });

  test("renders device list items when loading is false, and deviceListData is present", () => {
    const testOverrides = {
      loading: false,
      sortedAndFilteredDeviceList: [
        {
          id: "Th3ngERn9",
          system_name: "MAC-LEADER",
          type: "MAC",
          hdd_capacity: "2048",
        },
        {
          id: "Th3ng23dw",
          system_name: "Cool-LEADER",
          type: "WINDOWS",
          hdd_capacity: "128",
        },
        {
          id: "Th3ng2d44",
          system_name: "Linux-LEADER",
          type: "LINUX",
          hdd_capacity: "256",
        },
      ],
    };

    render(
      <ThemeProvider theme={theme}>
        <I18nextProvider i18n={i18n}>
          <DevicePageProvider testOverrides={testOverrides}>
            <DeviceList />
          </DevicePageProvider>
        </I18nextProvider>
      </ThemeProvider>
    );

    expect(screen.getByText(/MAC-LEADER/i)).toBeInTheDocument();
    expect(screen.getByText(/Cool-LEADER/i)).toBeInTheDocument();
    expect(screen.getByText(/Linux-LEADER/i)).toBeInTheDocument();
  });
});
