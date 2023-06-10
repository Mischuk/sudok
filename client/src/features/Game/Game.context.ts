import { createContext } from "react";
import { CellValue } from "../../utils/types";

export interface CellCoordinates {
  row: number;
  col: number;
}

export interface SelectedCell {
  position: CellCoordinates | null;
  value: CellValue;
}

interface I_GameContext {
  selected: SelectedCell;
  onSelectCell: (cell: SelectedCell) => void;
}

export const GameContext = createContext<I_GameContext>({
  selected: {
    position: null,
    value: null,
  },
  onSelectCell: () => {},
});
