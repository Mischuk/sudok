import { useCallback, useEffect, useMemo, useState } from "react";
import { socket } from "../../api/instances";
import { Game, GameInfo, GameStatus } from "./Home.types";
import { DTO_Game, DTO_Player, EVENTS } from "utils";

export const usePlayers = () => {
  const [players, setPlayers] = useState<DTO_Player[]>([]);

  useEffect(() => {
    socket.on(EVENTS.PLAYER.CONNECT.SERVER, ({ players }) => {
      setPlayers(players || []);
    });

    socket.on(EVENTS.PLAYER.DISCONNECT.SERVER, ({ players }) => {
      setPlayers(players || []);
    });
  }, []);

  return { players, totalPlayers: players.length };
};

const INITIAL_PUZZLES = new Array(9).fill(null);

const INITIAL_DATA: GameInfo[] = new Array(9).fill(null).map((_, index) => ({
  id: index + 1,
  puzzle: [...INITIAL_PUZZLES],
  solution: [...INITIAL_PUZZLES],
}));

const DOT = ".";
type Range = [number, number];
const getValues = (data: string[]) => data.map((v: string) => (v !== DOT ? Number(v) : null));
const getChunks = ({ value, range }: { value: string; range: Range }) => {
  return getValues(value.split("").slice(range[0], range[1]));
};
const getMatrix = ({ puzzle, solution }: DTO_Game): GameInfo[] => {
  const chunkSize = 9;
  const data: GameInfo[] = [];

  for (let i = 0; i < chunkSize * 9; i += chunkSize) {
    const range: Range = [i, i + chunkSize];
    data.push({
      id: i,
      puzzle: getChunks({ value: puzzle, range }),
      solution: getChunks({ value: solution, range }),
    });
  }

  return data;
};

export const useGame = () => {
  const [game, setGame] = useState<Game>({
    state: GameStatus.Init,
    data: INITIAL_DATA,
  });

  const changeGameStatus = useCallback(
    (status: GameStatus) => setGame((prev) => ({ ...prev, state: status })),
    []
  );

  const run = useCallback((data: DTO_Game) => {
    setGame({
      state: GameStatus.Process,
      data: getMatrix(data),
    });
  }, []);

  return useMemo(
    () => ({ changeStatus: changeGameStatus, status: game.state, run, data: game.data }),
    [changeGameStatus, game.state, run, game.data]
  );
};
