import { createContext } from "react";
import { DTO_Player } from "utils";

export const HomeContext = createContext<{ players: DTO_Player[] }>({ players: [] });
