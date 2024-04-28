import { useState } from "react";

interface PlayerProps {
  name: string;
  symbol: string;
  score: number;
}

function Player({ name, symbol, score }: PlayerProps) {
  const [isEditing, setIsEditing] = useState<boolean>(false);

  function handleEditClick() {
    setIsEditing((prevIsEditing) => !prevIsEditing);
  }

  let playerName = (
    <span className='player-name'>{name ? name : "Player 1"}</span>
  );

  if (isEditing) {
    playerName = <input type='text' required defaultValue={name} />;
  }

  return (
    <li>
      <span className='player'>
        {playerName}
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
