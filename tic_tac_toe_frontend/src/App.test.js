import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import Home from './pages/Home';
import Game from './pages/Game';
import About from './pages/About';

test('renders home content via router', () => {
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
