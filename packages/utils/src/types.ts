export interface DTO_Player {
  id: string;
}

export interface DTO_Game {
  puzzle: string;
  solution: string;
}

export enum Diff {
  Easy = "Easy",
  Normal = "Normal",
  Hard = "Hard",
  Ultra = "Ultra",
}
