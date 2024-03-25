import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import DeviceLogo from "./index";
import { OS } from "utils/constants/osConstants";

describe("DeviceLogo", () => {
  test("renders Windows logo when system is Windows", () => {
    render(<DeviceLogo system={OS.WINDOWS} />);
    expect(screen.getByText("windows.svg")).toBeInTheDocument();
  });

  test("renders Apple logo when system is macOS", () => {
    render(<DeviceLogo system={OS.MAC} />);
    expect(screen.getByText("apple.svg")).toBeInTheDocument();
  });

  test("renders Linux logo when system is Linux", () => {
    render(<DeviceLogo system={OS.LINUX} />);
    expect(screen.getByText("linux.svg")).toBeInTheDocument();
  });

  test("does not render any logo when system is unknown", () => {
    render(<DeviceLogo system="Unknown" />);
    expect(screen.queryByText(".svg")).toBeNull();
  });
});
