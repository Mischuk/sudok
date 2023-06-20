import { INITIAL_CELL } from "../../utils/consts";
import { GameCell } from "utils";
import { SelectedCell } from "./Game.types";

export const INITIAL_SELECTED: SelectedCell = {
  position: null,
  value: null,
};

export const CONFIG = {
  MAX_TIPS: 3,
};

export const VoidSelected = {
  cell: INITIAL_CELL,
  updateCell: (_: Partial<GameCell>) => {},
  updateSquare: () => {},
};

export const INITIAL_PROGRESS = 50;
