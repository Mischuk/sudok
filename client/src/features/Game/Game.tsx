import { FC, useCallback, useEffect, useMemo, useState } from "react";
import {
  DataContext,
  DataContextType,
  SelectContext,
  SelectContextType,
} from "./Game.context";
import { INITIAL_SELECTED } from "./Game.consts";
import { SelectedCell } from "./Game.types";
import { deepCopy } from "../../utils";
import { GameRow } from "../../utils/types";
import { getVoidCells } from "./Game.utils";
import { GameRoot } from "./components/GameRoot/GameRoot";

interface Props {
  initialData: GameRow[];
}

export const Game: FC<Props> = ({ initialData }) => {
  const [selected, onSelectCell] = useState<SelectedCell>(INITIAL_SELECTED);
  const [data, setData] = useState<GameRow[]>([]);
  const { voidCellsTotal } = getVoidCells(data);

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

  const ContextSelect: SelectContextType = useMemo(
    () => ({ selected, onSelectCell: handleSelectCell }),
    [handleSelectCell, selected]
  );
  const ContextData: DataContextType = useMemo(
    () => ({
      data,
      updateData: setData,
      voidCellsTotal,
    }),
    [data, voidCellsTotal]
  );

  return (
    <SelectContext.Provider value={ContextSelect}>
      <DataContext.Provider value={ContextData}>
        <GameRoot />
      </DataContext.Provider>
    </SelectContext.Provider>
  );
};
