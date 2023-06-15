import { FC, useCallback, useEffect, useState } from "react";
import { DataContext, HistoryContext, SelectContext } from "./Game.context";
import { INITIAL_SELECTED } from "./Game.consts";
import { History, SelectedCell } from "./Game.types";
import { deepCopy } from "../../utils";
import { GameRow } from "../../utils/types";
import { getNums, getVoidCells } from "./Game.utils";
import { GameRoot } from "./components/GameRoot/GameRoot";

interface Props {
  initialData: GameRow[];
}

export const Game: FC<Props> = ({ initialData }) => {
  const [selected, onSelectCell] = useState<SelectedCell>(INITIAL_SELECTED);
  const [data, setData] = useState<GameRow[]>([]);
  const { voidCellsTotal } = getVoidCells(data);
  const completeNums = getNums(data);
  const [history, setHistory] = useState<History[]>([]);

  const historyPush = useCallback(
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

  const historyPrev = useCallback(() => {
    if (!history.length) return;
    const { data, selected } = history[history.length - 1];

    setHistory((prev) => prev.slice(0, -1));
    onSelectCell(selected);
    setData(data);
  }, [history]);

  const handleSelectCell = useCallback(
    (nextSelectCell: SelectedCell) => {
      const removeCellHighlight = () => {
        if (!nextSelectCell.position) return;

        const rows = deepCopy<GameRow[]>(data);
        const cell = rows[nextSelectCell.position.row].cells[nextSelectCell.position.col];

        if (cell.highlighted) {
          rows[nextSelectCell.position.row].cells[nextSelectCell.position.col] = {
            ...cell,
            highlighted: false,
          };

          setData([...rows]);
        }
      };

      onSelectCell(nextSelectCell);
      removeCellHighlight();
    },
    [data]
  );

  useEffect(() => {
    setData(initialData);
  }, [initialData]);

  return (
    <SelectContext.Provider value={{ selected, onSelectCell: handleSelectCell }}>
      <DataContext.Provider
        value={{
          data,
          updateData: setData,
          voidCellsTotal,
          completeNums,
        }}
      >
        <HistoryContext.Provider
          value={{ push: historyPush, prev: historyPrev, history }}
        >
          <GameRoot />
        </HistoryContext.Provider>
      </DataContext.Provider>
    </SelectContext.Provider>
  );
};
