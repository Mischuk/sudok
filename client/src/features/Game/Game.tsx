import { FC, useEffect, useState } from "react";
import { CellNotes, GameStatus } from "../Home/Home.types";
import { Field, FieldActions, Header, Numbers, Root } from "./Game.styles";
import { ProgressBar } from "../../components/ProgressBar/ProgressBar";
import { Num } from "../../components/Num/Num";
import { Board } from "../../components/Board/Board";
import { Healthbar } from "../../components/Healthbar/Healthbar";
import { Control } from "../../components/Control/Control";
import { GameContext, SelectedCell } from "./Game.context";
import { GameRow } from "../Home/Home.hooks";

interface Props {
  status: GameStatus;
  data: GameRow[];
}

export const Game: FC<Props> = ({ status, data }) => {
  const [isNotes, setIsNotes] = useState(false);
  const [selected, onSelectCell] = useState<SelectedCell>({
    position: null,
    value: null,
  });
  const toggleNum = (arr: CellNotes[], item: CellNotes) =>
    arr.includes(item) ? arr.filter((i) => i !== item) : [...arr, item];
  const [gameData, setGameData] = useState<GameRow[]>([]);

  const deepCopy = (obj: Object) => JSON.parse(JSON.stringify(obj));

  const onClickNum = (num: CellNotes) => {
    const { position, value } = selected;

    if (!position || value) return;

    if (isNotes) {
      const temp: GameRow[] = deepCopy(gameData);

      const cell = temp[position.row].cells[position.col];

      temp[position.row].cells[position.col] = {
        ...cell,
        notes: [...toggleNum(cell.notes, num)],
      };
      setGameData([...temp]);
    }
  };

  useEffect(() => {
    setGameData(data);
  }, [data]);

  return (
    <GameContext.Provider value={{ selected, onSelectCell }}>
      <Root>
        <ProgressBar />

        <Header>
          <FieldActions>
            <Control size={90}>⬅</Control>
            <Control size={80}>❌</Control>
            <Control>💡</Control>
            <Control>🎲</Control>
          </FieldActions>
          <Healthbar />
        </Header>

        <Field>
          <Board isLoading={status === GameStatus.Prepare} data={gameData} />
        </Field>

        <Numbers>
          <Num onClick={() => onClickNum(1)}>1</Num>
          <Num onClick={() => onClickNum(2)}>2</Num>
          <Num onClick={() => onClickNum(3)}>3</Num>
          <Num onClick={() => onClickNum(4)}>4</Num>
          <Num onClick={() => onClickNum(5)}>5</Num>
          <Num onClick={() => onClickNum(6)}>6</Num>
          <Num onClick={() => onClickNum(7)}>7</Num>
          <Num onClick={() => onClickNum(8)}>8</Num>
          <Num onClick={() => onClickNum(9)}>9</Num>
          <Num
            type="note"
            isActive={isNotes}
            onClick={() => setIsNotes(!isNotes)}
          >
            ✏️
          </Num>
        </Numbers>
      </Root>
    </GameContext.Provider>
  );
};
