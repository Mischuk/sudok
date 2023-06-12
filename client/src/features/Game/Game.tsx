import { FC, useEffect, useState } from "react";
import { CellNotes, GameStatus } from "../Home/Home.types";
import { Field, FieldActions, Controls, Numbers, Root } from "./Game.styles";
import { ProgressBar } from "../../components/ProgressBar/ProgressBar";
import { Num } from "../../components/Num/Num";
import { Board } from "../../components/Board/Board";
import { Control } from "../../components/Control/Control";
import { GameContext, SelectedCell } from "./Game.context";
import { GameCell, GameRow, INITIAL_CELL } from "../Home/Home.hooks";
import { deepCopy, getRandomInt, toggleNum } from "./Game.utils";
import IconBack from "../../assets/icons/back.svg";
import IconErase from "../../assets/icons/erase.svg";
import IconNote from "../../assets/icons/note.svg";
import IconTip from "../../assets/icons/tip.svg";

interface Props {
  status: GameStatus;
  data: GameRow[];
}
const INITIAL_SELECTED = {
  position: null,
  value: null,
};

const MAX_TIPS = 3;
interface RandomItem {
  row: number;
  col: number;
  answer: number;
}
const getRandomEmptyCell = (data: GameRow[]) => {
  const rows = deepCopy<GameRow[]>(data);

  const emptyCells = rows.reduce<RandomItem[]>((prev, row, rowIndex) => {
    const cells = row.cells
      .map((cell, cellIndex) => {
        if (cell.value === null) {
          return {
            row: rowIndex,
            col: cellIndex,
            answer: cell.answer,
          };
        } else {
          return undefined;
        }
      })
      .filter((cell) => cell) as RandomItem[];
    return [...prev, ...cells];
  }, []);

  const randomIndex = getRandomInt(0, emptyCells.length - 1);

  return emptyCells[randomIndex];
};
interface History {
  selected: SelectedCell;
  data: GameRow[];
}

export const Game: FC<Props> = ({ status, data }) => {
  const [isNotes, setIsNotes] = useState(false);
  const [selected, onSelectCell] = useState<SelectedCell>(INITIAL_SELECTED);
  const [gameData, setGameData] = useState<GameRow[]>([]);
  const [history, setHistory] = useState<History[]>([]);
  const [tips, setTips] = useState(MAX_TIPS);

  const pushToHistory = () =>
    setHistory((p) => [
      ...p,
      {
        selected,
        data: deepCopy<GameRow[]>(gameData),
      },
    ]);

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
    if (!selected.position || selected.value) return;

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
    const { data, selected } = history[history.length - 1];
    setGameData(data);
    setHistory((prev) => prev.slice(0, -1));
    onSelectCell(selected);
  };

  const onClearCell = () => {
    if (!selected.position) return;

    const { updateCell } = currents();
    updateCell({ value: null, notes: [], error: false });
    onSelectCell((prev) => ({
      ...prev,
      value: null,
    }));
  };

  const onTip = () => {
    if (!tips) return;

    const rows = deepCopy<GameRow[]>(gameData);

    const randomCell = getRandomEmptyCell(gameData);
    const cell = rows[randomCell.row].cells[randomCell.col];

    pushToHistory();

    rows[randomCell.row].cells[randomCell.col] = {
      ...cell,
      value: randomCell.answer,
      notes: [],
      error: false,
    };

    setTips(tips - 1);
    setGameData([...rows]);
    onSelectCell({
      value: randomCell.answer,
      position: {
        col: randomCell.col,
        row: randomCell.row,
      },
    });

    // TODO:  ws event on tip (open same cell for the opponent, pass this randomCell data to server)
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
              <img src={IconBack} alt="bck" />
            </Control>
            <Control onClick={onClearCell}>
              <img src={IconErase} alt="rmv" />
            </Control>
            <Control
              isActive={isNotes}
              label={isNotes ? "ON" : "OFF"}
              onClick={() => setIsNotes(!isNotes)}
            >
              <img src={IconNote} alt="edit" />
            </Control>
            <Control
              label={`${tips}`}
              isActive={!!tips}
              styles={{ border: "none" }}
              onClick={onTip}
            >
              <img src={IconTip} alt="tip" />
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
