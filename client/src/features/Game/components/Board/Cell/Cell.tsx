import { FC, useContext } from "react";
import { NumNote, Root } from "./Cell.styles";
import { SelectContext } from "../../../Game.context";
import { CellNotes, CellValue } from "utils";
import { NUM_NOTE_POSITION } from "./Cell.consts";
import { CellCoordinates } from "../../../Game.types";

interface Props {
  position: CellCoordinates;
  value: CellValue;
  notes: CellNotes[];
  error: boolean;
  highlighted?: boolean;
}

export const Cell: FC<Props> = ({
  highlighted = false,
  value,
  position: { col, row },
  notes,
  error,
}) => {
  const { onSelectCell, selected } = useContext(SelectContext);

  const isSelected = row === selected.position?.row && col === selected.position?.col;
  const isHighlighted = col === selected.position?.col;
  const isActive = !!value && selected.value === value;
  const onClick = () => onSelectCell({ position: { row, col }, value });

  return (
    <Root
      onClick={onClick}
      $isSelected={isSelected}
      $isHighlighted={isHighlighted}
      $isActive={isActive}
      $isError={error}
      $isGift={highlighted}
    >
      {value}

      {!value &&
        notes.map((note) => (
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
