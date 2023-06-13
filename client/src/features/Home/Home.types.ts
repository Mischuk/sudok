import { CellValue, GameRow } from "../../utils/types";

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

export type ChunkRange = [number, number];
