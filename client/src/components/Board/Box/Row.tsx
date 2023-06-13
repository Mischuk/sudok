import { FC, useContext } from "react";
import { Cell } from "../Cell/Cell";
import { Cells, Root } from "./Row.styles";
import { GameContext } from "../../../features/Game/Game.context";
import { GameCell } from "../../../utils/types";

interface Props {
  cells?: GameCell[];
  rowIndex: number;
}

export const Row: FC<Props> = ({ rowIndex, cells = [] }) => {
  const { selected } = useContext(GameContext);

  return (
    <Root $isSelected={selected.position?.row === rowIndex}>
      <Cells>
        {cells.map((cell, idx) => {
          return (
            <Cell
              key={idx}
              position={{ row: rowIndex, col: idx }}
              value={cell.value}
              notes={cell.notes}
              error={cell.error}
              highlighted={cell.highlighted}
            />
          );
        })}
      </Cells>
    </Root>
  );
};
