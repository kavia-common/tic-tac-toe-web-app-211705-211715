import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Game from '../pages/Game';

describe('Game component', () => {
  test('prevents clicking the same cell twice', () => {
    render(<Game />);
    const cell1 = screen.getByRole('gridcell', { name: /cell 1/i });
    fireEvent.click(cell1);
    expect(cell1).toHaveTextContent('X');
    // disabled after set
    fireEvent.click(cell1);
    // still X
    expect(cell1).toHaveTextContent('X');
  });

  test('detects a winner', () => {
    render(<Game />);
    const [c1, c2, c3, c4, c5] = [
      screen.getByLabelText(/cell 1/i),
      screen.getByLabelText(/cell 2/i),
      screen.getByLabelText(/cell 4/i),
      screen.getByLabelText(/cell 5/i),
      screen.getByLabelText(/cell 9/i),
    ];
    // X:1 O:2 X:4 O:5 X:7? we used 9 - set a winning diagonal: 1,5,9 for X
    fireEvent.click(c1); // X
    fireEvent.click(c2); // O
    fireEvent.click(c4); // X at 4 (cell 4 is index 3) - not diag yet
    fireEvent.click(c3); // O at 3 (cell 3 is index 2)
    fireEvent.click(c5); // X at 9 (index 8)
    expect(screen.getByText(/Winner: X/i)).toBeInTheDocument();
  });
});
