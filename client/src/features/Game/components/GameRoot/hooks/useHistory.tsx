import { useCallback, useContext, useMemo, useState } from "react";
import { History, SelectedCell } from "../../../Game.types";
import { deepCopy } from "../../../../../utils";
import { GameRow } from "../../../../../utils/types";
import { DataContext, SelectContext } from "../../../Game.context";

export const useHistory = () => {
  const { data, updateData } = useContext(DataContext);
  const { selected, onSelectCell } = useContext(SelectContext);
  const [history, setHistory] = useState<History[]>([]);

  const push = useCallback(
    () =>
      setHistory((prev) => [
        ...prev,
        {
          data: deepCopy<GameRow[]>(data),
          selected: deepCopy<SelectedCell>(selected),
        },
      ]),
    [data, selected]
  );

  const prev = useCallback(() => {
    if (!history.length) return;
    const { data, selected } = history[history.length - 1];

    setHistory((prev) => prev.slice(0, -1));
    onSelectCell(selected);
    updateData(data);
  }, [history, onSelectCell, updateData]);

  return useMemo(
    () => ({
      push,
      prev,
    }),
    [prev, push]
  );
};
