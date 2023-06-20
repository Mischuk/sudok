import { deepCopy, getRandomInt } from "../../utils";
import { CellNotes, GameRow } from "utils";
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

export const getNums = (data: GameRow[]) => {
  const doneNums: CellNotes[] = [];
  const rows = deepCopy<GameRow[]>(data);

  for (let index = 1; index <= 9; index++) {
    const num = rows.reduce((acc, row) => {
      const cell = row.cells.find(({ value, error }) => value === index && !error);
      return cell ? acc + 1 : acc;
    }, 0);

    if (num === 9) {
      doneNums.push(index as CellNotes);
    }
  }

  return doneNums;
};

export const getTotalClosedCells = (data: GameRow[]) => {
  return data.reduce<number>((acc, row) => {
    let temp = 0;
    row.cells.forEach((c) => {
      if (c.value === null) {
        temp++;
      }
      if (c.value && c.error) {
        temp++;
      }
    });
    return acc + temp;
  }, 0);
};
