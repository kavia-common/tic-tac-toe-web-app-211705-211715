import React, { useEffect, useState } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import './App.css';
import { auditLog } from './utils/auditTrail';
import ErrorBoundary from './components/ErrorBoundary';

/**
// ============================================================================
// REQUIREMENT TRACEABILITY
// ============================================================================
Requirement ID: REQ-Router-001
User Story: As a user, I can navigate between Home, Game, and About pages without page reloads.
Acceptance Criteria:
- BrowserRouter with routes '/', '/game', '/about'
- Top navigation
- Error boundary
- Client-side audit logging on navigation
GxP Impact: YES - UI navigation logging for traceability
Risk Level: LOW
Validation Protocol: VP-ROUTER-001
// ============================================================================ 
*/

/**
 * PUBLIC_INTERFACE
 * AppLayout provides the top-level layout with navigation and theme toggle.
 * It renders nested routes via <Outlet/>.
 */
export default function App() {
  const [theme, setTheme] = useState('light');
  const location = useLocation();

  // Apply theme to the document element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Log navigation for audit trail (GxP - contemporaneous, attributable)
  useEffect(() => {
    auditLog({
      userId: 'anonymous', // In real app, pull from auth context
      action: 'NAVIGATE',
      details: { path: location.pathname }
    });
  }, [location.pathname]);

  // PUBLIC_INTERFACE
  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className="app-shell">
      <header className="navbar">
        <Link to="/" className="brand" aria-label="Go to Home">
          <span className="brand-icon" aria-hidden>⭕</span>
          <span className="brand-text">Tic Tac Toe</span>
        </Link>
        <nav className="nav-links" aria-label="Primary">
          <NavLink to="/" end className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}>Home</NavLink>
          <NavLink to="/game" className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}>Game</NavLink>
          <NavLink to="/about" className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}>About</NavLink>
        </nav>
        <button
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
        </button>
      </header>

      <main className="main">
        <div className="container">
          <ErrorBoundary>
            <Outlet />
          </ErrorBoundary>
        </div>
      </main>

      <footer className="footer">
        <span>© {new Date().getFullYear()} Ocean Professional · Kavia</span>
      </footer>
    </div>
  );
}
