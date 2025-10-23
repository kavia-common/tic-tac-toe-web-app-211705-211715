import React from 'react';
import { Link } from 'react-router-dom';
import { auditLog } from '../utils/auditTrail';

/**
 * PUBLIC_INTERFACE
 * Home page: Intro and navigation to Game.
 */
export default function Home() {
  const handleStart = () => {
    auditLog({ userId: 'anonymous', action: 'START_GAME_CLICK', details: {} });
  };
  return (
    <section className="card hero">
      <h1 className="title">Welcome to Tic Tac Toe</h1>
      <p className="description">
        Play a quick match in a modern, ocean-inspired interface.
      </p>
      <div className="actions">
        <Link to="/game" className="btn btn-primary" onClick={handleStart}>
          Play Now
        </Link>
        <Link to="/about" className="btn btn-secondary">About</Link>
      </div>
    </section>
  );
}
