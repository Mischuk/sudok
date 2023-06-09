import { FC } from "react";
import { Root, Rows } from "./Board.styles";
import { Row } from "./Box/Row";
import { GameInfo } from "../../features/Home/Home.types";
import { Loader } from "../Loader/Loader";

interface Props {
  isLoading: boolean;
  data: GameInfo[];
}

export const Board: FC<Props> = ({ isLoading, data }) => {
  return (
    <Root>
      <Rows>
        {data.map((r) => (
          <Row value={r.puzzle} key={r.id} />
        ))}
      </Rows>

      {isLoading && <Loader />}
    </Root>
  );
};
