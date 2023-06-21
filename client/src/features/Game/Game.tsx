import { FC, useCallback, useEffect, useState } from "react";
import { DataContext, HistoryContext, SelectContext } from "./Game.context";
import { INITIAL_SELECTED } from "./Game.consts";
import { CellCoordinates, History, SelectedCell } from "./Game.types";
import { deepCopy, getSquare } from "../../utils";
import { getNums, getTotalClosedCells } from "./Game.utils";
import { GameRoot } from "./components/GameRoot/GameRoot";
import { EVENTS, GameCell, GameRow } from "utils";
import { socket } from "../../api/instances";
import { Axis } from "../../utils/types";

interface Props {
  initialData: GameRow[];
}

export const Game: FC<Props> = ({ initialData }) => {
  const [selected, onSelectCell] = useState<SelectedCell>(INITIAL_SELECTED);
  const [data, setData] = useState<GameRow[]>([]);
  const voidCellsTotal = getTotalClosedCells(data);
  const completeNums = getNums(data);
  const [history, setHistory] = useState<History[]>([]);

  const historyPush = useCallback(() => {
    setHistory((prev) => [
      ...prev,
      {
        data: deepCopy<GameRow[]>(data),
        selected: deepCopy<SelectedCell>(selected),
      },
    ]);
  }, [data, selected]);

  const historyPrev = useCallback(() => {
    if (!history.length) return;
    const { data, selected } = history[history.length - 1];

    setHistory((prev) => prev.slice(0, -1));
    onSelectCell(selected);
    setData(data);

    socket.emit(EVENTS.CELL.OPENED, { data });
  }, [history]);

  const historyPull = useCallback(
    ({
      nextPosition,
      nextCell,
    }: {
      nextCell: GameCell;
      nextPosition: CellCoordinates;
    }) => {
      setHistory((prev) => {
        return prev.map((h) => {
          const rows = h.data;

          rows[nextPosition.row].cells[nextPosition.col] = {
            ...nextCell,
            notes: [],
          };

          const updateAxis = ({ value, position }: Axis) => {
            const row = rows[position.row];
            const updCells: GameCell[] = row.cells.map((c) => {
              return {
                ...c,
                notes: c.notes.filter((i) => i !== value),
              };
            });
            rows[position.row] = { ...row, cells: updCells };

            const updRows: GameRow[] = rows.map((row) => {
              const updCells = row.cells.map((cell, index) => {
                if (index === position.col) {
                  return {
                    ...cell,
                    notes: cell.notes.filter((i) => i !== value),
                  };
                }
                return {
                  ...cell,
                };
              });
              return {
                ...row,
                cells: updCells,
              };
            });

            return updRows;
          };

          const updateNotes = ({ value, position }: Axis) => {
            const nextData = updateAxis({
              value,
              position,
            });

            const row = position.row;
            const col = position.col;

            const { cells = [] } = getSquare({ row, col });

            const rows = deepCopy<GameRow[]>(nextData);

            cells.forEach(({ col, row }) => {
              const cell = rows[row].cells[col];

              rows[row].cells[col] = {
                ...cell,
                notes: cell.notes.filter((i) => i !== value),
              };
            });

            return rows;
          };

          const nextRows = updateNotes({
            value: nextCell.answer,
            position: nextPosition,
          });

          return {
            ...h,
            data: nextRows,
          };
        });
      });
    },
    []
  );

  const handleSelectCell = useCallback(
    (nextSelectCell: SelectedCell) => {
      const removeCellHighlight = () => {
        if (!nextSelectCell.position) return;

        const rows = deepCopy<GameRow[]>(data);
        const cell = rows[nextSelectCell.position.row].cells[nextSelectCell.position.col];

        if (cell.highlighted) {
          rows[nextSelectCell.position.row].cells[nextSelectCell.position.col] = {
            ...cell,
            highlighted: false,
          };

          setData([...rows]);
        }
      };

      onSelectCell(nextSelectCell);
      removeCellHighlight();
    },
    [data]
  );

  useEffect(() => {
    setData(initialData);
  }, [initialData]);

  return (
    <SelectContext.Provider value={{ selected, onSelectCell: handleSelectCell }}>
      <DataContext.Provider
        value={{
          data,
          updateData: setData,
          voidCellsTotal,
          completeNums,
        }}
      >
        <HistoryContext.Provider
          value={{ push: historyPush, prev: historyPrev, pull: historyPull, history }}
        >
          <GameRoot />
        </HistoryContext.Provider>
      </DataContext.Provider>
    </SelectContext.Provider>
  );
};
