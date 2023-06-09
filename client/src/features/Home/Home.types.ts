export enum GameStatus {
  Init = "Init",
  Prepare = "Prepare",
  Process = "Process",
}

export interface GameInfo {
  id: number;
  puzzle: (number | null)[];
  solution: (number | null)[];
}

export interface Game {
  state: GameStatus;
  data: GameInfo[];
}
