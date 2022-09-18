import { render, screen } from "@testing-library/react";
import Navbar from "..";
import "@testing-library/jest-dom";

describe('Component: Navbar', () => {
  it('component renders', () => {
    render(<Navbar />);

    expect(screen.getByText('URL Shortener')).toBeInTheDocument();
  });
});
