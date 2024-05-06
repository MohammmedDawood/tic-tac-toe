const intialGameBoard = [
  [" ", " ", " "],
  [" ", " ", " "],
  [" ", " ", " "],
];
function GameBoard() {
  return (
    <ol id='game-board'>
      {intialGameBoard.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, cellIndex) => (
              <li key={cellIndex}>
                <button className='cell'>{playerSymbol}</button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}

export default GameBoard;
