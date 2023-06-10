import { FC, memo } from "react";
import { Root, Rows } from "./Board.styles";
import { Row } from "./Box/Row";
import { GameInfo } from "../../features/Home/Home.types";
import { Loader } from "../Loader/Loader";

interface Props {
  isLoading: boolean;
  data: GameInfo[];
}

export const Board: FC<Props> = memo(({ isLoading, data }) => {
  return (
    <Root>
      <Rows>
        {data.map((row, rowIndex) => (
          <Row cells={row.puzzle} key={row.id} rowIndex={rowIndex} />
        ))}
      </Rows>

      {isLoading && <Loader />}
    </Root>
  );
});
