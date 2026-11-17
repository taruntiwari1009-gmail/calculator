import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";

const press = (name) => fireEvent.click(screen.getByRole("button", { name }));

beforeEach(() => {
  render(<App />);
});

test("evaluates a basic addition expression", () => {
  press("1");
  press("+");
  press("2");
  press("=");
  expect(screen.getByText("3")).toBeInTheDocument();
});

test("respects multiplication precedence", () => {
  press("2");
  press("+");
  press("3");
  press("Multiply");
  press("4");
  press("=");
  expect(screen.getByText("14")).toBeInTheDocument();
});

test("shows an error for division by zero", () => {
  press("5");
  press("Divide");
  press("0");
  press("=");
  expect(screen.getByText("Error")).toBeInTheDocument();
});

test("clears the current expression", () => {
  press("8");
  press("+");
  press("2");
  press("AC");
  expect(screen.getByText("0")).toBeInTheDocument();
});
