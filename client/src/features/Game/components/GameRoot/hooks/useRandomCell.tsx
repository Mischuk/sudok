import { useContext } from "react";
import { deepCopy } from "../../../../../utils";
import { GameRow } from "../../../../../utils/types";
import { getRandomVoidCell } from "../../../Game.utils";
import { DataContext, HistoryContext, SelectContext } from "../../../Game.context";

export const useRandomCell = () => {
  const { data, updateData } = useContext(DataContext);
  const { onSelectCell } = useContext(SelectContext);
  const history = useContext(HistoryContext);

  const open = ({
    highlighted,
    changeSelect = true,
  }: {
    changeSelect: boolean;
    highlighted: boolean;
  }) => {
    const rows = deepCopy<GameRow[]>(data);
    const randomCell = getRandomVoidCell(rows);
    const cell = rows[randomCell.row].cells[randomCell.col];

    history.push();

    rows[randomCell.row].cells[randomCell.col] = {
      ...cell,
      value: randomCell.answer,
      notes: [],
      error: false,
      highlighted,
    };

    updateData([...rows]);

    if (changeSelect) {
      onSelectCell({
        value: randomCell.answer,
        position: {
          col: randomCell.col,
          row: randomCell.row,
        },
      });
    }
  };

  return { open };
};
