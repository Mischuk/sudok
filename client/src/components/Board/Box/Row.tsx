import { FC } from "react";
import { Cell } from "../Cell/Cell";
import { Cells, Root } from "./Row.styles";
import { CellValue } from "../../../utils/types";

interface Props {
  value?: CellValue[];
}

export const Row: FC<Props> = ({ value = [] }) => {
  return (
    <Root>
      <Cells>
        {value.map((v, idx) => {
          return <Cell value={v} key={idx} />;
        })}
      </Cells>
    </Root>
  );
};
