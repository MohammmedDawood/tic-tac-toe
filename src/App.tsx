import "./App.css";
import Player from "./components/Player.tsx";

function App() {
  return (
    <main>
      <div id='game-container'>
        <ol id='players'>
          <Player name='Player 1' symbol='X' score={0} />
          <Player name='Player 2' symbol='O' score={0} />
        </ol>
        Game Board
      </div>
    </main>
  );
}

export default App;
