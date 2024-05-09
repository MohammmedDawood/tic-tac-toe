import { useState } from "react";
import "./App.css";
import GameBoard from "./components/GameBoard.tsx";
import Player from "./components/Player.tsx";
import Log from "./components/Log.tsx";

interface ITurns {
  square: { row: number; col: number };
  player: string;
}

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
        <GameBoard onSelectSquare={onSelectSquare} turns={gameTurns} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
