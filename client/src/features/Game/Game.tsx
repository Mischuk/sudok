import { FC, useEffect, useState } from "react";
import { CellNotes, GameStatus } from "../Home/Home.types";
import { Field, FieldActions, Controls, Numbers, Root } from "./Game.styles";
import { ProgressBar } from "../../components/ProgressBar/ProgressBar";
import { Num } from "../../components/Num/Num";
import { Board } from "../../components/Board/Board";
import { Control } from "../../components/Control/Control";
import { GameContext, SelectedCell } from "./Game.context";
import { GameCell, GameRow, INITIAL_CELL } from "../Home/Home.hooks";
import { deepCopy, toggleNum } from "./Game.utils";
import { ReactComponent as IconBack } from "../../assets/icons/back.svg";
import { ReactComponent as IconErase } from "../../assets/icons/erase.svg";
import { ReactComponent as IconNote } from "../../assets/icons/note.svg";
import { ReactComponent as IconTip } from "../../assets/icons/tip.svg";

interface Props {
  status: GameStatus;
  data: GameRow[];
}
const INITIAL_SELECTED = {
  position: null,
  value: null,
};

export const Game: FC<Props> = ({ status, data }) => {
  const [isNotes, setIsNotes] = useState(false);
  const [selected, onSelectCell] = useState<SelectedCell>(INITIAL_SELECTED);
  const [gameData, setGameData] = useState<GameRow[]>([]);
  const [history, setHistory] = useState<GameRow[][]>([]);

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
        // TODO: ws event on mistake (open random cell for the opponent)
      } else {
        // TODO: ws event on success (re-calc progressbar)
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

        <Field>
          <Board isLoading={status === GameStatus.Prepare} data={gameData} />
        </Field>

        <Controls>
          <FieldActions>
            <Control onClick={onBackward} disabled={!history.length}>
              <IconBack />
            </Control>
            <Control onClick={onClearCell}>
              <IconErase />
            </Control>
            <Control
              isActive={isNotes}
              label={isNotes ? "ON" : "OFF"}
              onClick={() => setIsNotes(!isNotes)}
            >
              <IconNote />
            </Control>
            <Control label="3" isActive={!!3} styles={{ border: "none" }}>
              <IconTip />
            </Control>
          </FieldActions>
        </Controls>

        <Numbers>
          {new Array(9).fill(null).map((_, index) => (
            <Num key={`num${index}`} onClick={() => onClickNum((index + 1) as CellNotes)}>
              {index + 1}
            </Num>
          ))}
        </Numbers>
      </Root>
    </GameContext.Provider>
  );
};
