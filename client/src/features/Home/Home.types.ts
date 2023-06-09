import { CellValue } from "../../utils/types";

export enum GameStatus {
  Init = "Init",
  Prepare = "Prepare",
  Process = "Process",
}

export interface GameInfo {
  id: number;
  puzzle: CellValue[];
  solution: CellValue[];
}

export interface Game {
  state: GameStatus;
  data: GameInfo[];
}
