import { deepCopy, getRandomInt } from "../../utils";
import { GameRow } from "../../utils/types";
import { RandomItem } from "./Game.types";

export const getVoidCells = (data: GameRow[]) => {
  const rows = deepCopy<GameRow[]>(data);

  const voidCells = rows.reduce<RandomItem[]>((prev, row, rowIndex) => {
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

  return {
    voidCells,
    voidCellsTotal: voidCells.length,
  };
};

export const getRandomVoidCell = (data: GameRow[]) => {
  const { voidCells, voidCellsTotal } = getVoidCells(data);
  const randomIndex = getRandomInt(0, voidCellsTotal - 1);
  return voidCells[randomIndex];
};
