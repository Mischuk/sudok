import { createContext } from "react";
import { SelectedCell } from "./Game.types";
import { GameRow } from "../../utils/types";

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
}

export const DataContext = createContext<DataContextType>({
  data: [],
  updateData: () => {},
  voidCellsTotal: 0,
});
