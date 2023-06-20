import { createContext } from "react";
import { SelectedCell } from "./Game.types";
import { CellNotes, GameRow } from "utils";

export interface SelectContextType {
  selected: SelectedCell;
  onSelectCell: (cell: SelectedCell) => void;
}

export const SelectContext = createContext<SelectContextType>({
  selected: {
    position: null,
    value: null,
  },
  onSelectCell: () => {},
});

export interface DataContextType {
  data: GameRow[];
  updateData: (data: GameRow[]) => void;
  voidCellsTotal: number;
  completeNums: CellNotes[];
}

export const DataContext = createContext<DataContextType>({
  data: [],
  updateData: () => {},
  voidCellsTotal: 0,
  completeNums: [],
});

export interface HistoryContextType {
  prev: any;
  push: any;
  history: any;
}

export const HistoryContext = createContext<HistoryContextType>({
  prev: () => {},
  push: () => {},
  history: [],
});
