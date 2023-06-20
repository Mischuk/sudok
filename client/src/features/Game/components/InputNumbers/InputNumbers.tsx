import { FC, useContext } from "react";
import { styled } from "styled-components";
import { CellNotes, MAX_NUM } from "utils";
import { Num } from "../../../../components/Num/Num";
import { DataContext } from "../../Game.context";

interface Props {
  onClick: (index: CellNotes) => void;
  isNotes: boolean;
}

const Numbers = styled("div")`
  display: flex;
  flex-wrap: wrap;
  flex: 1;
  padding: 5px;
`;

export const InputNumbers: FC<Props> = ({ isNotes, onClick }) => {
  const { completeNums } = useContext(DataContext);
  const getStatus = (num: CellNotes) => completeNums.includes(num);

  return (
    <Numbers>
      {new Array(MAX_NUM).fill(null).map((_, index) => {
        return (
          <Num
            key={`num${index}`}
            onClick={() => onClick((index + 1) as CellNotes)}
            isVisible={getStatus((index + 1) as CellNotes)}
            isNotes={isNotes}
          >
            {index + 1}
          </Num>
        );
      })}
    </Numbers>
  );
};
