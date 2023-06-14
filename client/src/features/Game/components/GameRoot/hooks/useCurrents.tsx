import { useContext } from "react";
import { deepCopy } from "../../../../../utils";
import { GameRow, GameCell } from "../../../../../utils/types";
import { VoidSelected } from "../../../Game.consts";
import { SelectedCell } from "../../../Game.types";
import { DataContext } from "../../../Game.context";
import { useHistory } from "./useHistory";

export const useCurrents = () => {
  const { data, updateData } = useContext(DataContext);
  const history = useHistory();

  const currents = (selected: SelectedCell) => {
    const { position } = selected;
    if (!position) return VoidSelected;

    const rows = deepCopy<GameRow[]>(data);
    const cell = rows[position.row].cells[position.col];

    const updateCell = (nextCell: Partial<GameCell>) => {
      history.push();

      rows[position.row].cells[position.col] = {
        ...cell,
        ...nextCell,
      };

      updateData([...rows]);
    };

    return { cell, updateCell };
  };

  return { currents };
};
