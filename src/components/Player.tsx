import { useState } from "react";

interface PlayerProps {
  intialName: string;
  symbol: string;
  score: number;
}

function Player({ intialName, symbol, score }: PlayerProps) {
  const [playerName, setPlayerName] = useState<string>(intialName);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  function handleEditClick() {
    setIsEditing((prevIsEditing) => !prevIsEditing);
  }

  function handleSaveClick() {
    const input = document.querySelector("input") as HTMLInputElement;
    const newName = input.value;
    setPlayerName(newName);
    setIsEditing(false);
  }

  let editableplayerName = (
    <span className='player-name'>{playerName ? playerName : "Player 1"}</span>
  );

  if (isEditing) {
    editableplayerName = (
      <input type='text' required defaultValue={playerName} />
    );
  }

  return (
    <li>
      <span className='player'>
        {editableplayerName}
        <span className='player-symbol'>{symbol ? symbol : "X"}</span>
        <span className='player-score'>{score ? score : 0}</span>
      </span>
      <button className='edit-player' onClick={handleEditClick}>
        {isEditing ? "Save" : "Edit"}
      </button>
    </li>
  );
}

export default Player;
