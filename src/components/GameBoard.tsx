import { useState } from "react";

const intialGameBoard = [
  [" ", " ", " "],
  [" ", " ", " "],
  [" ", " ", " "],
];

interface GameBoardProps {
  handleSelectCellChange: () => void;
  activePlayerSymbol: string;
}
function GameBoard({
  handleSelectCellChange,
  activePlayerSymbol,
}: GameBoardProps) {
  const [gameBoard, setGameBoard] = useState<string[][]>(intialGameBoard);

  function handleCellClick(
    rowIndex: number,
    colIndex: number,
    playerSymbol: string
  ) {
    setGameBoard((prevGameBoard) => {
      const updatedBoard = [
        ...prevGameBoard.map((innerArray) => [...innerArray]),
      ];
      updatedBoard[rowIndex][colIndex] = playerSymbol;
      return updatedBoard;
    });
    handleSelectCellChange();
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
                  onClick={() =>
                    handleCellClick(rowIndex, colIndex, activePlayerSymbol)
                  }
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
