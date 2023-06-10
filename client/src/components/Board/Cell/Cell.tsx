import { FC, useContext } from "react";
import { Root } from "./Cell.styles";
import {
  CellCoordinates,
  GameContext,
} from "../../../features/Game/Game.context";
import { CellValue } from "../../../utils/types";

interface Props {
  position: CellCoordinates;
  value: CellValue;
}

export const Cell: FC<Props> = ({ value, position: { col, row } }) => {
  const { onSelectCell, selected } = useContext(GameContext);

  const isSelected =
    row === selected.position?.row && col === selected.position?.col;
  const isHighlighted = col === selected.position?.col;
  const isActive = !!value && selected.value === value;
  const onClick = () => onSelectCell({ position: { row, col }, value });

  return (
    <Root
      onClick={onClick}
      $isSelected={isSelected}
      $isHighlighted={isHighlighted}
      $isActive={isActive}
    >
      {value}
    </Root>
  );
};
