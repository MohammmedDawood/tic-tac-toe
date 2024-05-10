import { useState } from "react";
import "./App.css";
import GameBoard from "./components/GameBoard.tsx";
import Player from "./components/Player.tsx";
import Log from "./components/Log.tsx";
import { WINNING_COBINATION } from "./winning-cmbinations.tsx";
import GameOver from "./components/GameOver.tsx";

const INITIAL_GAME_BOARD = [
  [" ", " ", " "],
  [" ", " ", " "],
  [" ", " ", " "],
];

/* ------------------ Interfaces ------------------ */
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

const PLAYERS: IPlayers = [
  {
    X: {
      name: "Player 1",
      score: 0,
    },
  },
  {
    O: {
      name: "Player 2",
      score: 0,
    },
  },
];

/* ------------------ Helper Functions ------------------ */
// intialized game board
function initializeGameBoard(gameTurns: ITurns[]) {
  let gameBoard = [...INITIAL_GAME_BOARD.map((row) => [...row])];

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }
  return gameBoard;
}

// getActivePlayer function
function getActivePlayer(turns: ITurns[]) {
  let currentPlayer = "X";
  if (turns && turns.length > 0 && turns[0].player === "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
}

// check for winning combination
function checkWinner(gameBoard: string[][], players: IPlayers) {
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
  return winner;
}

/* ------------------ App Component ------------------ */

function App() {
  const [players, setPlayers] = useState<IPlayers>(PLAYERS);
  const [gameTurns, setGameTurns] = useState<ITurns[]>([]);

  players.map((player, index) => {
    console.log(player, index);
  });
  // initialize game board
  const gameBoard = initializeGameBoard(gameTurns);
  // get active player
  const activePlayer = getActivePlayer(gameTurns);
  // check for winner
  const winner = checkWinner(gameBoard, players);
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
    // if (winner) {
    //   setPlayers((prevPlayers) => {
    //     const updatedPlayers = prevPlayers.map((player) => {
    //       const playerSymbol = winner === player.X?.name ? "X" : "O";

    //       return {
    //         [playerSymbol]: {
    //           name: player[playerSymbol]?.name,
    //           score: player[playerSymbol]?.score + 1,
    //         },
    //       };
    //     });
    //     return updatedPlayers;
    //   });
    // }
  }

  // handle player name change and score
  function handlePlayerNameChange(playerSymbol: string, playerName: string) {
    setPlayers((prevPlayers) => {
      const updatedPlayers = prevPlayers.map((player) => {
        if (player[playerSymbol]) {
          return {
            [playerSymbol]: {
              name: playerName,
              score: player[playerSymbol]?.score,
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
            const playerSymbol = Object.keys(player)[0];
            const { name, score } = player[playerSymbol]!;
            return (
              <Player
                key={playerSymbol + index}
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
