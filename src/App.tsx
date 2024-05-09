import { useState } from "react";
import "./App.css";
import GameBoard from "./components/GameBoard.tsx";
import Player from "./components/Player.tsx";
import Log from "./components/Log.tsx";
import { WINNING_COBINATION } from "./winning-cmbinations.tsx";
import GameOver from "./components/GameOver.tsx";

const intialGameBoard = [
  [" ", " ", " "],
  [" ", " ", " "],
  [" ", " ", " "],
];

interface ITurns {
  square: { row: number; col: number };
  player: string;
}

// getActivePlayer function
function getActivePlayer(turns: ITurns[]) {
  let currentPlayer = "X";
  if (turns && turns.length > 0 && turns[0].player === "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
}

function App() {
  const [gameTurns, setGameTurns] = useState<ITurns[]>([]);
  const activePlayer = getActivePlayer(gameTurns);

  // intialized game board
  let gameBoard = [...intialGameBoard.map((row) => [...row])];

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }

  // check for winning combination
  let winner: string = "";
  for (const combination of WINNING_COBINATION) {
    const [first, second, third] = combination;

    const firstSquareSymbol = gameBoard[first.row][first.col];
    const secondSquareSymbol = gameBoard[second.row][second.col];
    const thirdSquareSymbol = gameBoard[third.row][third.col];

    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol &&
      firstSquareSymbol !== " "
    ) {
      winner = firstSquareSymbol;
    }
  }

  // check for draw
  const hasDraw: boolean = gameTurns.length === 9 && !winner;

  function onSelectSquare(rowIndex: number, colIndex: number) {
    setGameTurns((prevTurns) => {
      const currentPlayer = getActivePlayer(prevTurns);
      const updatedTurns = [
        {
          square: {
            row: rowIndex,
            col: colIndex,
          },
          player: currentPlayer,
        },
        ...prevTurns,
      ];
      return updatedTurns;
    });
  }

  // reset game
  function resetGame() {
    setGameTurns([]);
  }

  // handle player name change and score

  return (
    <main>
      <div id='game-container'>
        <ol id='players' className='highlight-player'>
          <Player
            intialName='Player 1'
            symbol='X'
            score={0}
            isActive={activePlayer === "X"}
          />
          <Player
            intialName='Player 2'
            symbol='O'
            score={0}
            isActive={activePlayer === "O"}
          />
        </ol>
        {(winner || hasDraw) && (
          <GameOver winner={winner} resetGame={resetGame} />
        )}
        <GameBoard onSelectSquare={onSelectSquare} gameBoard={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
