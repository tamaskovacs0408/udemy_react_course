import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Greeting from "./Greeting";

describe("Testing Greeting component", () => {
  test("rendering Hello Word", () => {
    render(<Greeting />);

    expect(screen.getByText(/Hello World/i)).toBeInTheDocument();
  });

  test('rendering "good to see you" when button NOT clicked', () => {
    render(<Greeting />);

    expect(screen.getByText(/good to see you/i)).toBeInTheDocument();
  });

  test('rendering "Changed!" when button clicked', () => {
    render(<Greeting />);
    // Simulating the button clicking with userEvent, but we can use fireEvent too
    userEvent.click(screen.getByRole("button"));

    expect(screen.getByText("Changed!")).toBeInTheDocument();
  });
});
