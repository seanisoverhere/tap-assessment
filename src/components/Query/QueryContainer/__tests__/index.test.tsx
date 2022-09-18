import { render, screen, waitFor } from "@testing-library/react";
import QueryContainer from "..";
import "@testing-library/jest-dom";
import userEvent from '@testing-library/user-event'

describe('Component: QueryContainer', () => {
  const user = userEvent.setup()
  render(<QueryContainer />);

  it('form to throw an error if input is empty', async () => {
    const button = screen.getByRole('button')
    await user.click(button)

    await waitFor(() => expect(screen.getByText(/Please enter something/)).toBeInTheDocument())
  })

});
