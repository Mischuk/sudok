import { FC, useCallback, useContext, useEffect, useState } from "react";
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
import { socket } from "../../api/instances";
import { EVENTS } from "utils";
import { AuthContext } from "../Auth/Auth.context";

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

const getEmptyCells = (rows: GameRow[]) => {
  return rows.reduce<RandomItem[]>((prev, row, rowIndex) => {
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
};

const getRandomEmptyCell = (data: GameRow[]) => {
  const rows = deepCopy<GameRow[]>(data);
  const emptyCells = getEmptyCells(rows);
  const randomIndex = getRandomInt(0, emptyCells.length - 1);
  return emptyCells[randomIndex];
};

interface History {
  selected: SelectedCell;
  data: GameRow[];
}

export const Game: FC<Props> = ({ status, data }) => {
  const { id } = useContext(AuthContext);
  const [isNotes, setIsNotes] = useState(false);
  const [selected, onSelectCell] = useState<SelectedCell>(INITIAL_SELECTED);
  const [gameData, setGameData] = useState<GameRow[]>([]);
  const [history, setHistory] = useState<History[]>([]);
  const [tips, setTips] = useState(MAX_TIPS);
  const [progress, setProgress] = useState(50);

  const pushToHistory = useCallback(
    () =>
      setHistory((p) => [
        ...p,
        {
          selected,
          data: deepCopy<GameRow[]>(gameData),
        },
      ]),
    [gameData, selected]
  );

  const currents = (nextSelected?: SelectedCell) => {
    const { position } = nextSelected || selected;
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
        socket.emit(EVENTS.CELL.OPENED, {
          id,
          cells: getEmptyCells(gameData).length - 1,
        });
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

  const openRandomCell = useCallback(
    ({
      data,
      highlighted,
      changeSelect = true,
    }: {
      data: GameRow[];
      changeSelect: boolean;
      highlighted: boolean;
    }) => {
      const rows = deepCopy<GameRow[]>(data);
      const randomCell = getRandomEmptyCell(rows);
      const cell = rows[randomCell.row].cells[randomCell.col];

      pushToHistory();

      rows[randomCell.row].cells[randomCell.col] = {
        ...cell,
        value: randomCell.answer,
        notes: [],
        error: false,
        highlighted,
      };

      setGameData([...rows]);

      if (changeSelect) {
        onSelectCell({
          value: randomCell.answer,
          position: {
            col: randomCell.col,
            row: randomCell.row,
          },
        });
      }
    },
    [pushToHistory]
  );

  const onTip = () => {
    if (!tips) return;
    openRandomCell({ data: gameData, changeSelect: true, highlighted: false });
    setTips(tips - 1);

    socket.emit(EVENTS.CELL.TIPED.CLIENT, {
      id,
      cells: getEmptyCells(gameData).length - 1,
    });
  };

  useEffect(() => {
    setGameData(data);
  }, [data]);

  useEffect(() => {
    socket.on(EVENTS.GAME.UPDATE_PROGRESS, (progress: number) => {
      setProgress(progress);
    });
  }, []);

  useEffect(() => {
    const onCellTipedServer = () => {
      openRandomCell({ data: gameData, changeSelect: false, highlighted: true });

      socket.emit(EVENTS.CELL.OPENED, {
        id,
        cells: getEmptyCells(gameData).length - 1,
      });
    };

    socket.on(EVENTS.CELL.TIPED.SERVER, onCellTipedServer);

    return () => {
      socket.off(EVENTS.CELL.TIPED.SERVER, onCellTipedServer);
    };
  }, [gameData, id, openRandomCell]);

  const handleSelectCell = (data: SelectedCell) => {
    onSelectCell(data);
    const { cell, updateCell } = currents(data);

    if (cell.highlighted) {
      updateCell({ highlighted: false });
    }
  };

  return (
    <GameContext.Provider value={{ selected, onSelectCell: handleSelectCell }}>
      <Root>
        <ProgressBar value={progress} position="top" />

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

        <ProgressBar value={progress} position="bottom" />
      </Root>
    </GameContext.Provider>
  );
};
