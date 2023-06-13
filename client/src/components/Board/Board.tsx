import { FC, memo } from "react";
import { Root, Rows } from "./Board.styles";
import { Row } from "./Box/Row";
import { Loader } from "../Loader/Loader";
import { GameRow } from "../../utils/types";

interface Props {
  isLoading: boolean;
  data: GameRow[];
}

export const Board: FC<Props> = memo(({ isLoading, data }) => {
  return (
    <Root>
      <Rows>
        {data.map((row, rowIndex) => (
          <Row cells={row.cells} key={row.id} rowIndex={rowIndex} />
        ))}
      </Rows>

      {isLoading && <Loader />}
    </Root>
  );
});
