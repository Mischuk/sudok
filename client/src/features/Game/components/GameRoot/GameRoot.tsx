import { useContext, useEffect, useState } from "react";
import { BoardField, Controls, Root } from "./GameRoot.styles";
import { ProgressBar } from "../../../../components/ProgressBar/ProgressBar";
import { useProgress } from "./hooks/useProgress";
import { Board } from "../Board/Board";
import { DataContext, HistoryContext, SelectContext } from "../../Game.context";
import { Control } from "../../../../components/Control/Control";
import { InputNumbers } from "../InputNumbers/InputNumbers";
import { useCurrents } from "./hooks/useCurrents";
import { useTips } from "./hooks/useTips";
import { useRandomCell } from "./hooks/useRandomCell";
import { socket } from "../../../../api/instances";
import { EVENTS } from "utils";
import { AuthContext } from "../../../Auth/Auth.context";
import { CellNotes } from "../../../../utils/types";
import { toggleNum } from "../../../../utils";

export const GameRoot = () => {
  const { id } = useContext(AuthContext);
  const { progress } = useProgress();
  const history = useContext(HistoryContext);
  const tips = useTips();
  const { selected, onSelectCell } = useContext(SelectContext);
  const { currents } = useCurrents();
  const randomCell = useRandomCell();
  const [isNotes, setIsNotes] = useState(false);
  const { voidCellsTotal } = useContext(DataContext);
  const onBackward = () => history.prev();

  const onClearCell = () => {
    if (!selected.position) return;

    const { updateCell } = currents(selected);
    updateCell({ value: null, notes: [], error: false });
    onSelectCell({
      value: null,
      position: selected.position,
    });
  };

  const onTip = () => tips.get();

  const onClickNum = (num: CellNotes) => {
    if (!selected.position || selected.value) return;

    const { cell, updateCell, updateCellAxis } = currents(selected);

    if (isNotes) {
      updateCell({ notes: [...toggleNum(cell.notes, num)] });
    }

    if (!isNotes) {
      const error = cell.answer !== num;

      updateCellAxis({
        value: num,
        nextCell: {
          value: num,
          error,
        },
      });

      onSelectCell({ value: num, position: selected.position });

      if (error) {
        socket.emit(EVENTS.CELL.TIPED.CLIENT, {
          id,
          cells: voidCellsTotal,
        });
      } else {
        socket.emit(EVENTS.CELL.OPENED, {
          id,
          cells: voidCellsTotal - 1,
        });
      }
    }
  };

  useEffect(() => {
    const onCellTipedServer = () => {
      randomCell.open({ changeSelect: false, highlighted: true });

      socket.emit(EVENTS.CELL.OPENED, {
        id,
        cells: voidCellsTotal - 1,
      });
    };

    socket.on(EVENTS.CELL.TIPED.SERVER, onCellTipedServer);

    return () => {
      socket.off(EVENTS.CELL.TIPED.SERVER, onCellTipedServer);
    };
  }, [id, randomCell, voidCellsTotal]);

  return (
    <Root>
      <ProgressBar value={progress} position="top" />
      <ProgressBar value={progress} position="bottom" />

      <BoardField>
        <Board />
      </BoardField>

      <Controls>
        <Control onClick={onBackward} icon="back" />
        <Control onClick={onClearCell} icon="erase" />
        <Control
          isActive={isNotes}
          label={isNotes ? "ON" : "OFF"}
          onClick={() => setIsNotes(!isNotes)}
          icon="note"
        />
        <Control
          label={`${tips.count}`}
          isActive={!!tips.count}
          styles={{ border: "none" }}
          onClick={onTip}
          icon="tip"
        />
      </Controls>

      <InputNumbers onClick={(index) => onClickNum(index)} />
    </Root>
  );
};
