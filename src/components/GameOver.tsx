interface IProps {
  winner: string;
  resetGame: () => void;
}

function GameOver({ winner, resetGame }: IProps) {
  return (
    <div id='game-over'>
      <h2>Game Over</h2>
      {winner && <p>Winner is Player {winner}</p>}
      {!winner && <p>It's a draw!</p>}
      <p>
        <button id='play-again' onClick={resetGame}>
          Play Again!
        </button>
      </p>
    </div>
  );
}

export default GameOver;
