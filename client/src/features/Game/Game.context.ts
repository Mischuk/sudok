import { createContext } from "react";
import { SelectedCell } from "./Game.types";

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
