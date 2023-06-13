import { GameCell } from "./types";

export const LS = {
  userId: "userId",
};

export const MAX_NUM = 9;
export const DOT = ".";

export const INITIAL_CELL: GameCell = {
  value: null,
  answer: 0,
  notes: [],
  error: false,
  highlighted: false,
};

export const MIN_PLAYERS = 2;
