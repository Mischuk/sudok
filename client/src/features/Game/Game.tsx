import { FC, useCallback, useContext, useEffect, useState } from "react";
import { GameStatus } from "../Home/Home.types";
import { Field, FieldActions, Controls, Root } from "./Game.styles";
import { ProgressBar } from "../../components/ProgressBar/ProgressBar";
import { Board } from "../../components/Board/Board";
import { Control } from "../../components/Control/Control";
import { GameContext } from "./Game.context";
import { socket } from "../../api/instances";
import { EVENTS } from "utils";
import { AuthContext } from "../Auth/Auth.context";
import { CONFIG, INITIAL_SELECTED } from "./Game.consts";
import { SelectedCell } from "./Game.types";
import { deepCopy, toggleNum } from "../../utils";
import { INITIAL_CELL } from "../../utils/consts";
import { GameRow, GameCell, CellNotes } from "../../utils/types";
import { getVoidCells, getRandomVoidCell } from "./Game.utils";
import { InputNumbers } from "./InputNumbers/InputNumbers";
import { useHistory } from "./Game.hooks";

interface Props {
  status: GameStatus;
  data: GameRow[];
}

export const Game: FC<Props> = ({ status, data }) => {
  const { id } = useContext(AuthContext);
  const [isNotes, setIsNotes] = useState(false);
  const [selected, onSelectCell] = useState<SelectedCell>(INITIAL_SELECTED);
  const [gameData, setGameData] = useState<GameRow[]>([]);
  const history = useHistory({ gameData, selected });
  const [tips, setTips] = useState(CONFIG.MAX_TIPS);
  const [progress, setProgress] = useState(50);

  const { voidCellsTotal } = getVoidCells(gameData);

  const currents = (selected: SelectedCell) => {
    const { position } = selected;
    if (!position)
      return { cell: INITIAL_CELL, updateCell: (_: Partial<GameCell>) => {} };

    const rows = deepCopy<GameRow[]>(gameData);
    const cell = rows[position.row].cells[position.col];

    const updateCell = (nextCell: Partial<GameCell>) => {
      history.push();

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

    const { cell, updateCell } = currents(selected);

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
        socket.emit(EVENTS.CELL.TIPED.CLIENT, {
          id,
          cells: voidCellsTotal,
        });
      } else {
        socket.emit(EVENTS.CELL.OPENED, {
          id,
          cells: voidCellsTotal - 1,
        });
      }
    }
  };

  const onBackward = () => {
    const prev = history.prev();

    if (!prev) return;

    setGameData(prev.data);
    onSelectCell(prev.selected);
  };

  const onClearCell = () => {
    if (!selected.position) return;

    const { updateCell } = currents(selected);
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
      const randomCell = getRandomVoidCell(rows);
      const cell = rows[randomCell.row].cells[randomCell.col];

      history.push();

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
    [history]
  );

  const onTip = () => {
    if (!tips) return;
    openRandomCell({ data: gameData, changeSelect: true, highlighted: false });
    setTips(tips - 1);

    socket.emit(EVENTS.CELL.TIPED.CLIENT, {
      id,
      cells: voidCellsTotal - 1,
    });
  };

  useEffect(() => {
    setGameData(data);
  }, [data]);

  useEffect(() => {
    const updateProgress = (progress: number) => setProgress(progress);
    socket.on(EVENTS.GAME.UPDATE_PROGRESS, updateProgress);

    return () => {
      socket.off(EVENTS.GAME.UPDATE_PROGRESS, updateProgress);
    };
  }, []);

  useEffect(() => {
    const onCellTipedServer = () => {
      openRandomCell({ data: gameData, changeSelect: false, highlighted: true });

      socket.emit(EVENTS.CELL.OPENED, {
        id,
        cells: voidCellsTotal - 1,
      });
    };

    socket.on(EVENTS.CELL.TIPED.SERVER, onCellTipedServer);

    return () => {
      socket.off(EVENTS.CELL.TIPED.SERVER, onCellTipedServer);
    };
  }, [gameData, id, openRandomCell, voidCellsTotal]);

  const handleSelectCell = (nextSelectCell: SelectedCell) => {
    onSelectCell(nextSelectCell);
    const { cell, updateCell } = currents(nextSelectCell);
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
            <Control onClick={onBackward} icon="back" />
            <Control onClick={onClearCell} icon="erase" />
            <Control
              isActive={isNotes}
              label={isNotes ? "ON" : "OFF"}
              onClick={() => setIsNotes(!isNotes)}
              icon="note"
            />
            <Control
              label={`${tips}`}
              isActive={!!tips}
              styles={{ border: "none" }}
              onClick={onTip}
              icon="tip"
            />
          </FieldActions>
        </Controls>

        <InputNumbers onClick={(index) => onClickNum(index)} />

        <ProgressBar value={progress} position="bottom" />
      </Root>
    </GameContext.Provider>
  );
};
