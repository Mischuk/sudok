import { FC, memo, useContext } from "react";
import { Root, Rows } from "./Board.styles";
import { Row } from "./Box/Row";
import { Loader } from "../../../../components/Loader/Loader";
import { GameStatus } from "../../../Home/Home.types";
import { HomeContext } from "../../../Home/Home.context";
import { DataContext } from "../../Game.context";

interface Props {}

export const Board: FC<Props> = memo(() => {
  const { status } = useContext(HomeContext);
  const { data } = useContext(DataContext);

  const isLoading = status === GameStatus.Prepare;

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
