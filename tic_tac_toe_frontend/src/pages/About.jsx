import React from 'react';

/**
 * PUBLIC_INTERFACE
 * About/Rules page: Basic rules and information.
 */
export default function About() {
  return (
    <section className="card">
      <h1 className="title">About & Rules</h1>
      <p className="description">
        Tic Tac Toe is a two-player game. Players take turns marking spaces in a 3×3 grid.
        The player who succeeds in placing three of their marks in a horizontal, vertical,
        or diagonal row is the winner.
      </p>
      <ul className="list">
        <li>Player X goes first.</li>
        <li>Players alternate turns.</li>
        <li>First to three in a row wins. Otherwise, it’s a draw.</li>
      </ul>
    </section>
  );
}
