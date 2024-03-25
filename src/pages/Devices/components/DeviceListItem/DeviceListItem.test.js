import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { ThemeProvider } from "@mui/material/styles";
import theme from "config/theme";
import DeviceListItem from "./index";
import { I18nextProvider } from "react-i18next";
import { i18n } from "utils/";

describe("DeviceListItem", () => {
  const device = {
    id: "1",
    type: "windows",
    system_name: "MyDevice",
    hdd_capacity: 500,
  };

  test("renders device system name", () => {
    render(
      <ThemeProvider theme={theme}>
        <I18nextProvider i18n={i18n}>
          <DeviceListItem device={device} />
        </I18nextProvider>
      </ThemeProvider>
    );
    expect(screen.getByText(device.system_name)).toBeInTheDocument();
  });

  test("renders device type and capacity", () => {
    render(
      <ThemeProvider theme={theme}>
        <I18nextProvider i18n={i18n}>
          <DeviceListItem device={device} />
        </I18nextProvider>
      </ThemeProvider>
    );
    const expectedText = `Windows workstation - ${device.hdd_capacity} GB`;
    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
