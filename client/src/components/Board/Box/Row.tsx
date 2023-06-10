import { FC, useContext } from "react";
import { Cell } from "../Cell/Cell";
import { Cells, Root } from "./Row.styles";
import { CellValue } from "../../../utils/types";
import { GameContext } from "../../../features/Game/Game.context";

interface Props {
  cells?: CellValue[];
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
              value={cell}
            />
          );
        })}
      </Cells>
    </Root>
  );
};
