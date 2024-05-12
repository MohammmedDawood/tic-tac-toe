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

interface IPlayers {
  [key: string]: {
    name: string;
    score: number;
  };
}

const PLAYERS: IPlayers = {
  X: {
    name: "Player 1",
    score: 0,
  },
  O: {
    name: "Player 2",
    score: 0,
  },
};

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
      const winningPlayer = players[firstSquareSymbol]?.name;
      if (winningPlayer) {
        winner = firstSquareSymbol;
      }
    }
  }
  return winner;
}

/* ------------------ App Component ------------------ */

function App() {
  const [players, setPlayers] = useState<IPlayers>(PLAYERS);
  const [gameTurns, setGameTurns] = useState<ITurns[]>([]);

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
    if (winner) {
      setPlayers((prevPlayers) => {
        const updatedPlayers = {
          ...prevPlayers,
          [winner]: {
            name: prevPlayers[winner].name,
            score: prevPlayers[winner].score + 1,
          },
        };
        return updatedPlayers;
      });
    }
  }

  // handle player name change and score
  function handlePlayerNameChange(playerSymbol: string, playerName: string) {
    setPlayers((prevPlayers) => {
      const updatedPlayers = {
        ...prevPlayers,
        [playerSymbol]: {
          name: playerName,
          score: prevPlayers[playerSymbol].score,
        },
      };
      return updatedPlayers;
    });
  }

  return (
    <main>
      <div id='game-container'>
        <ol id='players' className='highlight-player'>
          {/* {players.map((player, index) => {
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
          })} */}
          {Object.keys(players).map((playerSymbol) => {
            const { name, score } = players[playerSymbol];
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
          <GameOver
            winner={winner ? players[winner].name : ""}
            resetGame={resetGame}
          />
        )}
        <GameBoard onSelectSquare={onSelectSquare} gameBoard={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
