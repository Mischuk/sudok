import { useContext } from "react";
import { deepCopy, getSquare } from "../../../../../utils";
import { GameCell, GameRow } from "utils";
import { getRandomVoidCell } from "../../../Game.utils";
import { DataContext, HistoryContext, SelectContext } from "../../../Game.context";
import { CellCoordinates } from "../../../Game.types";
interface Axis {
  value: number;
  position: CellCoordinates;
}
export const useRandomCell = () => {
  const { data, updateData } = useContext(DataContext);
  const { onSelectCell } = useContext(SelectContext);
  const history = useContext(HistoryContext);

  const open = ({
    highlighted,
    changeSelect = true,
  }: {
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

    const nextData = updateNotes({
      value: randomCell.answer,
      position: {
        row: randomCell.row,
        col: randomCell.col,
      },
    });

    if (changeSelect) {
      onSelectCell({
        value: randomCell.answer,
        position: {
          col: randomCell.col,
          row: randomCell.row,
        },
      });
    }

    updateData([...nextData]);

    return nextData;
  };

  return { open };
};
