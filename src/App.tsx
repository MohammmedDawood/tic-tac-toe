import { useState } from "react";
import "./App.css";
import GameBoard from "./components/GameBoard.tsx";
import Player from "./components/Player.tsx";

function App() {
  const [activePlayer, setActivePlayer] = useState<string>("X");

  function handleSelectCellChange() {
    console.log("handleSelectCellChange");

    setActivePlayer((prevActivePlayer) =>
      prevActivePlayer === "X" ? "O" : "X"
    );
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
        <GameBoard
          handleSelectCellChange={handleSelectCellChange}
          activePlayerSymbol={activePlayer}
        />
      </div>
    </main>
  );
}

export default App;
