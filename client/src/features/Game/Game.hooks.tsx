import { useCallback, useMemo, useState } from "react";
import { History, SelectedCell } from "./Game.types";
import { deepCopy } from "../../utils";
import { GameRow } from "../../utils/types";

interface HistoryParams {
  gameData: GameRow[];
  selected: SelectedCell;
}

export const useHistory = ({ gameData, selected }: HistoryParams) => {
  const [history, setHistory] = useState<History[]>([]);

  const push = useCallback(
    () =>
      setHistory((prev) => [
        ...prev,
        {
          data: deepCopy<GameRow[]>(gameData),
          selected: deepCopy<SelectedCell>(selected),
        },
      ]),
    [gameData, selected]
  );

  const prev = useCallback(() => {
    if (!history.length) return;
    const { data, selected } = history[history.length - 1];

    setHistory((prev) => prev.slice(0, -1));

    return { data, selected };
  }, [history]);

  return useMemo(
    () => ({
      push,
      prev,
    }),
    [prev, push]
  );
};
