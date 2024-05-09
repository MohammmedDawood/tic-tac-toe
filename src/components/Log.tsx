interface LogProps {
  turns: {
    square: { row: number; col: number };
    player: string;
  }[];
}

function Log({ turns }: LogProps) {
  return (
    <ol id='log'>
      {turns?.map((turn, index) => {
        const { square, player } = turn;
        const { row, col } = square;
        return (
          <li key={index}>
            Player {player} selected square at {col},{row}
          </li>
        );
      })}
    </ol>
  );
}

export default Log;
