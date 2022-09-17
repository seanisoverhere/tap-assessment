import { render, screen } from "@testing-library/react";
import Home from "../index";
import "@testing-library/jest-dom";

describe('Home', () => {
  it('renders a heading', () => {
    render(<Home />);

    expect(screen.getByText('hello')).toBeInTheDocument();
  });
});
