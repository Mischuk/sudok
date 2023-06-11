import { CellValue } from "../../utils/types";
import { GameRow } from "./Home.hooks";

export enum GameStatus {
  Init = "Init",
  Prepare = "Prepare",
  Process = "Process",
}

export interface GameInfo {
  id: number;
  puzzle: CellValue[];
  solution: number[];
}

export interface Game {
  state: GameStatus;
  data: GameRow[];
}

export type CellNotes = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
