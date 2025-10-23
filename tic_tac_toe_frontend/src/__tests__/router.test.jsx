import React from 'react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import App from '../App';
import Home from '../pages/Home';
import Game from '../pages/Game';
import About from '../pages/About';

describe('Routing', () => {
  test('renders Home at root path', () => {
    const router = createMemoryRouter([
      { path: '/', element: <App />, children: [
        { index: true, element: <Home /> },
        { path: 'game', element: <Game /> },
        { path: 'about', element: <About /> },
      ] }
    ], { initialEntries: ['/'] });

    render(<RouterProvider router={router} />);
    expect(screen.getByText(/Welcome to Tic Tac Toe/i)).toBeInTheDocument();
  });

  test('renders Game at /game', () => {
    const router = createMemoryRouter([
      { path: '/', element: <App />, children: [
        { index: true, element: <Home /> },
        { path: 'game', element: <Game /> },
        { path: 'about', element: <About /> },
      ] }
    ], { initialEntries: ['/game'] });

    render(<RouterProvider router={router} />);
    expect(screen.getByText(/Next Player/i)).toBeInTheDocument();
  });
});
