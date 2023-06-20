import { useContext } from "react";
import { deepCopy, getSquare } from "../../../../../utils";
import { GameRow, GameCell } from "utils";
import { VoidSelected } from "../../../Game.consts";
import { SelectedCell } from "../../../Game.types";
import { DataContext, HistoryContext } from "../../../Game.context";

interface Currents {
  cell: GameCell;
  updateCell: (nextCell: Partial<GameCell>) => void;
  updateSquare: ({
    nextCell,
    value,
  }: {
    value: number;
    nextCell: Partial<GameCell>;
  }) => void;
}

export const useCurrents = () => {
  const { data, updateData } = useContext(DataContext);
  const history = useContext(HistoryContext);

  const currents = (selected: SelectedCell): Currents => {
    const { position } = selected;
    if (!position) return VoidSelected;

    const rows = deepCopy<GameRow[]>(data);
    const cell = rows[position.row].cells[position.col];

    const updateCell = (nextCell: Partial<GameCell>) => {
      history.push();

      rows[position.row].cells[position.col] = {
        ...cell,
        ...nextCell,
      };

      updateData([...rows]);

      return rows;
    };

    const updateAxis = ({ value }: { value: number }): GameRow[] => {
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

    const updateCellAxis = ({
      nextCell,
      value,
    }: {
      value: number;
      nextCell: Partial<GameCell>;
    }) => {
      rows[position.row].cells[position.col] = {
        ...cell,
        ...nextCell,
      };
      const nextData = updateAxis({ value });
      return nextData;
    };

    const updateSquare = ({
      nextCell,
      value,
    }: {
      value: number;
      nextCell: Partial<GameCell>;
    }) => {
      history.push();

      const nextData = updateCellAxis({ nextCell, value });

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

      updateData([...rows]);

      return rows;
    };

    return { cell, updateCell, updateSquare };
  };

  return { currents };
};
