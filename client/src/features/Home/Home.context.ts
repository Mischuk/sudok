import { createContext } from "react";
import { DTO_Player } from "utils";
import { GameStatus } from "./Home.types";

export const HomeContext = createContext<{ players: DTO_Player[]; status: GameStatus }>({
  players: [],
  status: GameStatus.Init,
});
