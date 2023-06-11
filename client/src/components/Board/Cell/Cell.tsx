import { FC, useContext } from "react";
import { NumNote, Root } from "./Cell.styles";
import {
  CellCoordinates,
  GameContext,
} from "../../../features/Game/Game.context";
import { CellValue } from "../../../utils/types";
import { NUM_NOTE_POSITION } from "./Cell.consts";
import { CellNotes } from "../../../features/Home/Home.types";

interface Props {
  position: CellCoordinates;
  value: CellValue;
  notes: CellNotes[];
}

export const Cell: FC<Props> = ({ value, position: { col, row }, notes }) => {
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
      {notes.map((note) => (
        <NumNote
          key={note}
          $isActive={selected.value === note}
          $isSelected={isSelected}
          style={{ ...NUM_NOTE_POSITION[note] }}
        >
          {note}
        </NumNote>
      ))}
    </Root>
  );
};
