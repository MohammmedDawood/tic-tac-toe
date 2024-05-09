import { useState } from "react";
import "./App.css";
import GameBoard from "./components/GameBoard.tsx";
import Player from "./components/Player.tsx";
import Log from "./components/Log.tsx";

function App() {
  const [activePlayer, setActivePlayer] = useState<string>("X");
  const [gameTurns, setGameTurns] = useState<
    {
      square: { row: number; col: number };
      player: string;
    }[]
  >([]);

  function onSelectSquare(rowIndex: number, colIndex: number) {
    setActivePlayer((prevActivePlayer) =>
      prevActivePlayer === "X" ? "O" : "X"
    );

    setGameTurns((prevTurns) => {
      let currentPlayer = "X";
      if (prevTurns && prevTurns.length > 0 && prevTurns[0].player === "X") {
        currentPlayer = "O";
      }
      console.log(
        `Player ${currentPlayer} selected square at row ${rowIndex} and col ${colIndex}`
      );

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
