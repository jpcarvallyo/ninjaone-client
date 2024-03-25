import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";
import ControlPanel from "./index";
import { DevicePageProvider } from "../../DeviceContext";
import { I18nextProvider } from "react-i18next";
import { i18n } from "utils/";

describe("ControlPanel", () => {
  test("renders control panel components", () => {
    render(
      <I18nextProvider i18n={i18n}>
        <DevicePageProvider>
          <ControlPanel />
        </DevicePageProvider>
      </I18nextProvider>
    );

    expect(screen.getByTestId("control-panel")).toBeInTheDocument();
    expect(screen.getByTestId("search-input")).toBeInTheDocument();
  });

  test("allows changing search term", async () => {
    const testOverrides = {
      searchTerm: "test",
    };
    render(
      <I18nextProvider i18n={i18n}>
        <DevicePageProvider testOverrides={testOverrides}>
          <ControlPanel />
        </DevicePageProvider>
      </I18nextProvider>
    );

    expect(screen.getByDisplayValue("test")).toBeInTheDocument();
  });
});
