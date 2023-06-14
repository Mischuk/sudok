import { useContext, useState } from "react";
import { CONFIG } from "../../../Game.consts";
import { useRandomCell } from "./useRandomCell";
import { socket } from "../../../../../api/instances";
import { EVENTS } from "utils";
import { AuthContext } from "../../../../Auth/Auth.context";
import { DataContext } from "../../../Game.context";

export const useTips = () => {
  const { id } = useContext(AuthContext);
  const { voidCellsTotal } = useContext(DataContext);

  const randomCell = useRandomCell();

  const [tips, setTips] = useState(CONFIG.MAX_TIPS);

  const get = () => {
    if (!tips) return;
    randomCell.open({ changeSelect: true, highlighted: false });
    setTips(tips - 1);

    socket.emit(EVENTS.CELL.TIPED.CLIENT, {
      id,
      cells: voidCellsTotal - 1,
    });
  };

  return { get, count: tips };
};
