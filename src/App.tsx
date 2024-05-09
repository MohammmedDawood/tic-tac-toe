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

// interfaces
interface ITurns {
  square: { row: number; col: number };
  player: string;
}

interface IPlayer {
  [key: string]: {
    name: string;
    score: number;
  };
}

interface IPlayers extends Array<IPlayer> {}

// getActivePlayer function
function getActivePlayer(turns: ITurns[]) {
  let currentPlayer = "X";
  if (turns && turns.length > 0 && turns[0].player === "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
}

function App() {
  const [players, setPlayers] = useState<IPlayers>([
    { X: { name: "Player 1", score: 0 } },
    { O: { name: "Player 2", score: 0 } },
  ]);

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
      // return winner Name
      const winningPlayer = players?.find(
        (player) => player[firstSquareSymbol]
      );
      if (winningPlayer) {
        winner = winningPlayer[firstSquareSymbol]?.name;
      }
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
  function handlePlayerNameChange(playerSymbol: string, playerName: string) {
    setPlayers((prevPlayers) => {
      const updatedPlayers = prevPlayers.map((player) => {
        if (player[playerSymbol]) {
          return {
            [playerSymbol]: {
              name: playerName,
              score: player[playerSymbol].score,
            },
          };
        }
        return player;
      });
      return updatedPlayers;
    });
  }

  return (
    <main>
      <div id='game-container'>
        <ol id='players' className='highlight-player'>
          {players.map((player, index) => {
            const playerSymbol = index === 0 ? "X" : "O";
            const { name, score } = player[playerSymbol];
            return (
              <Player
                key={playerSymbol}
                symbol={playerSymbol}
                intialName={name}
                score={score}
                isActive={playerSymbol === activePlayer}
                onNameChange={handlePlayerNameChange}
              />
            );
          })}
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
