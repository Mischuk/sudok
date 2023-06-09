import { createContext } from "react";

export const HomeContext = createContext<{ players: any[] }>({ players: [] });
