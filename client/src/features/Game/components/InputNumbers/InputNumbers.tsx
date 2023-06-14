import { FC } from "react";
import { styled } from "styled-components";
import { CellNotes } from "../../../../utils/types";
import { MAX_NUM } from "../../../../utils/consts";
import { Num } from "../../../../components/Num/Num";

interface Props {
  onClick: (index: CellNotes) => void;
}

const Numbers = styled("div")`
  display: flex;
  flex-wrap: wrap;
  flex: 1;
  padding: 5px;
`;

export const InputNumbers: FC<Props> = ({ onClick }) => {
  return (
    <Numbers>
      {new Array(MAX_NUM).fill(null).map((_, index) => (
        <Num key={`num${index}`} onClick={() => onClick((index + 1) as CellNotes)}>
          {index + 1}
        </Num>
      ))}
    </Numbers>
  );
};
