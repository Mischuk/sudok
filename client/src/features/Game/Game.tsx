import { FC, useEffect, useState } from "react";
import { CellNotes, GameStatus } from "../Home/Home.types";
import { Field, FieldActions, Header, Numbers, Root } from "./Game.styles";
import { ProgressBar } from "../../components/ProgressBar/ProgressBar";
import { Num } from "../../components/Num/Num";
import { Board } from "../../components/Board/Board";
import { Healthbar } from "../../components/Healthbar/Healthbar";
import { Control } from "../../components/Control/Control";
import { GameContext, SelectedCell } from "./Game.context";
import { GameCell, GameRow, INITIAL_CELL } from "../Home/Home.hooks";
import { deepCopy, toggleNum } from "./Game.utils";

interface Props {
  status: GameStatus;
  data: GameRow[];
}
const INITIAL_SELECTED = {
  position: null,
  value: null,
};

const INITIAL_HP = 3;

export const Game: FC<Props> = ({ status, data }) => {
  const [isNotes, setIsNotes] = useState(false);
  const [selected, onSelectCell] = useState<SelectedCell>(INITIAL_SELECTED);
  const [gameData, setGameData] = useState<GameRow[]>([]);
  const [history, setHistory] = useState<GameRow[][]>([]);
  const [HP, setHP] = useState(INITIAL_HP);

  const pushToHistory = () => setHistory((p) => [...p, deepCopy<GameRow[]>(gameData)]);

  const currents = () => {
    const { position } = selected;
    if (!position)
      return { cell: INITIAL_CELL, updateCell: (_: Partial<GameCell>) => {} };

    const rows = deepCopy<GameRow[]>(gameData);
    const cell = rows[position.row].cells[position.col];

    const updateCell = (nextCell: Partial<GameCell>) => {
      pushToHistory();

      rows[position.row].cells[position.col] = {
        ...cell,
        ...nextCell,
      };

      setGameData([...rows]);
    };

    return { cell, updateCell };
  };

  const onClickNum = (num: CellNotes) => {
    const { position, value } = selected;

    if (!position || value) return;

    const { cell, updateCell } = currents();

    if (isNotes) {
      updateCell({ notes: [...toggleNum(cell.notes, num)] });
    }

    if (!isNotes) {
      const error = cell.answer !== num;

      updateCell({
        value: num,
        error,
      });

      onSelectCell((prev) => ({
        ...prev,
        value: num,
      }));

      if (error) {
        setHP((prev) => prev - 1);
      }
    }
  };

  const onBackward = () => {
    if (!history.length) return;
    setGameData(history[history.length - 1]);
    setHistory((prev) => prev.slice(0, -1));
  };

  const onClearCell = () => {
    const { position } = selected;

    if (!position) return;
    const { updateCell } = currents();
    updateCell({ value: null, notes: [], error: false });
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
            <Control size={90} onClick={onBackward} disabled={!history.length}>
              ⬅
            </Control>
            <Control size={70} onClick={onClearCell}>
              ❌
            </Control>
            <Control>💡</Control>
            <Control>🎲</Control>
          </FieldActions>
          <Healthbar HP={HP} />
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
          <Num type="note" isActive={isNotes} onClick={() => setIsNotes(!isNotes)}>
            ✏️
          </Num>
        </Numbers>
      </Root>
    </GameContext.Provider>
  );
};
