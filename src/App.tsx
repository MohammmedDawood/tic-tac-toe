import "./App.css";
import GameBoard from "./components/GameBoard.tsx";
import Player from "./components/Player.tsx";

function App() {
  return (
    <main>
      <div id='game-container'>
        <ol id='players'>
          <Player intialName='Player 1' symbol='X' score={0} />
          <Player intialName='Player 2' symbol='O' score={0} />
        </ol>
        <GameBoard />
      </div>
    </main>
  );
}

export default App;
