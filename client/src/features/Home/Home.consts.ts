import { INITIAL_CELL } from "../../utils/consts";
import { GameRow, MAX_NUM } from "utils";

const INITIAL_PUZZLES = new Array(MAX_NUM).fill(null);

export const INITIAL_GAME_DATA: GameRow[] = new Array(MAX_NUM)
  .fill(null)
  .map((_, index) => ({
    id: index + 1,
    cells: INITIAL_PUZZLES.map((o) => INITIAL_CELL),
  }));
