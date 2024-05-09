import { useEffect, useState } from "react";

const intialGameBoard = [
  [" ", " ", " "],
  [" ", " ", " "],
  [" ", " ", " "],
];

interface GameBoardProps {
  onSelectSquare: (rowIndex: number, colIndex: number) => void;
  turns: { square: { row: number; col: number }; player: string }[];
}
function GameBoard({ onSelectSquare, turns }: GameBoardProps) {
  let gameBoard = intialGameBoard;

  for (const turn of turns) {
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }

  return (
    <ol id='game-board'>
      {gameBoard.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, colIndex) => (
              <li key={colIndex}>
                <button
                  className='cell'
                  onClick={() => onSelectSquare(rowIndex, colIndex)}
                >
                  {playerSymbol}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}

export default GameBoard;
