import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";

const press = (name) => fireEvent.click(screen.getByRole("button", { name }));
const display = () => screen.getByLabelText("Calculator display");

beforeEach(() => {
  render(<App />);
});

test("evaluates a basic addition expression", () => {
  press("1");
  press("+");
  press("2");
  press("=");
  expect(display()).toHaveTextContent("3");
});

test("respects multiplication precedence", () => {
  press("2");
  press("+");
  press("3");
  press("Multiply");
  press("4");
  press("=");
  expect(display()).toHaveTextContent("14");
});

test("shows an error for division by zero", () => {
  press("5");
  press("Divide");
  press("0");
  press("=");
  expect(display()).toHaveTextContent("Error");
});

test("clears the current expression", () => {
  press("8");
  press("+");
  press("2");
  press("AC");
  expect(display()).toHaveTextContent("0");
});
