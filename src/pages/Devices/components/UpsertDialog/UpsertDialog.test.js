import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect"; // Make sure to include this import
import { ThemeProvider } from "@mui/material/styles"; // Import ThemeProvider
import { UpsertDialog } from "./index";
import theme from "../../../../config/theme"; // Import your theme

describe("UpsertDialog", () => {
  test("renders dialog with correct title when id is empty", () => {
    const handleClose = jest.fn();
    render(
      <ThemeProvider theme={theme}>
        <UpsertDialog open={true} handleClose={handleClose} id="" />
      </ThemeProvider>
    );
    expect(screen.getByText(/Add Device/i)).toBeInTheDocument(); // Using RegExp matcher
  });

  test("renders dialog with correct title when id is not empty", () => {
    const handleClose = jest.fn();
    render(
      <ThemeProvider theme={theme}>
        {" "}
        {/* Wrap component with ThemeProvider */}
        <UpsertDialog open={true} handleClose={handleClose} id="123" />
      </ThemeProvider>
    );
    expect(screen.getByText(/Edit Device/i)).toBeInTheDocument();
  });

  test("calls handleClose when close icon is clicked", () => {
    const handleClose = jest.fn();
    render(
      <ThemeProvider theme={theme}>
        {" "}
        {/* Wrap component with ThemeProvider */}
        <UpsertDialog open={true} handleClose={handleClose} id="" />
      </ThemeProvider>
    );
    fireEvent.click(screen.getByTestId("close-btn"));
    expect(handleClose).toHaveBeenCalled();
  });
});
