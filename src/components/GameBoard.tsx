interface GameBoardProps {
  onSelectSquare: (rowIndex: number, colIndex: number) => void;
  gameBoard: string[][];
}
function GameBoard({ onSelectSquare, gameBoard }: GameBoardProps) {
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
                  disabled={playerSymbol !== " "}
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
