import React, { useMemo, useState } from 'react';
import { auditLog } from '../utils/auditTrail';

/**
 * PUBLIC_INTERFACE
 * Game page: 2-player local Tic Tac Toe with input validation and logging.
 */
export default function Game() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [error, setError] = useState('');

  const winner = useMemo(() => calculateWinner(board), [board]);
  const isDraw = useMemo(() => board.every(Boolean) && !winner, [board, winner]);

  const currentPlayer = xIsNext ? 'X' : 'O';

  function handleCellClick(index) {
    // Validation: index must be 0-8, cell empty, and game not over
    if (typeof index !== 'number' || index < 0 || index > 8) {
      setError('Invalid move: out of bounds.');
      return;
    }
    if (board[index] || winner) {
      setError('Invalid move.');
      return;
    }
    setError('');
    const next = board.slice();
    next[index] = currentPlayer;
    setBoard(next);
    setXIsNext(!xIsNext);
    auditLog({
      userId: 'anonymous',
      action: 'MOVE',
      details: { index, player: currentPlayer, boardAfter: next }
    });
  }

  function resetGame() {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
    setError('');
    auditLog({ userId: 'anonymous', action: 'RESET_GAME', details: {} });
  }

  return (
    <section className="card">
      <div className="game-header">
        <h1 className="title">Game</h1>
        <button className="btn btn-secondary" onClick={resetGame} aria-label="Reset game">Reset</button>
      </div>

      <p className="status">
        {winner ? `Winner: ${winner}` : isDraw ? 'Draw!' : `Next Player: ${currentPlayer}`}
      </p>
      {error && <div className="inline-error" role="alert">{error}</div>}

      <div
        className="board"
        role="grid"
        aria-label="Tic Tac Toe Board"
      >
        {board.map((val, i) => (
          <button
            key={i}
            className="cell"
            role="gridcell"
            aria-label={`cell ${i + 1}`}
            onClick={() => handleCellClick(i)}
            disabled={Boolean(val) || Boolean(winner)}
          >
            {val}
          </button>
        ))}
      </div>
    </section>
  );
}

/**
 * PUBLIC_INTERFACE
 * calculateWinner: Determine winner on a 3x3 board array of 9 items.
 */
export function calculateWinner(squares) {
  // Validation: squares must be array of length 9
  if (!Array.isArray(squares) || squares.length !== 9) return null;

  const lines = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6],
  ];
  for (const [a,b,c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
