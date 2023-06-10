import { FC, useState } from "react";
import { GameInfo, GameStatus } from "../Home/Home.types";
import { Field, FieldActions, Header, Numbers, Root } from "./Game.styles";
import { ProgressBar } from "../../components/ProgressBar/ProgressBar";
import { Num } from "../../components/Num/Num";
import { Board } from "../../components/Board/Board";
import { Healthbar } from "../../components/Healthbar/Healthbar";
import { Control } from "../../components/Control/Control";
import { GameContext, SelectedCell } from "./Game.context";

interface Props {
  status: GameStatus;
  data: GameInfo[];
}

export const Game: FC<Props> = ({ status, data }) => {
  const [selectedCell, setSelectedCell] = useState<SelectedCell>({
    position: null,
    value: null,
  });

  return (
    <GameContext.Provider
      value={{ selected: selectedCell, onSelectCell: setSelectedCell }}
    >
      <Root>
        <ProgressBar />

        <Header>
          <FieldActions>
            <Control size={90}>↩️</Control>
            <Control size={80}>❌</Control>
            <Control>💡</Control>
            <Control>🎲</Control>
          </FieldActions>
          <Healthbar />
        </Header>

        <Field>
          <Board isLoading={status === GameStatus.Prepare} data={data} />
        </Field>

        <Numbers>
          <Num>1</Num>
          <Num>2</Num>
          <Num>3</Num>
          <Num>4</Num>
          <Num>5</Num>
          <Num>6</Num>
          <Num>7</Num>
          <Num>8</Num>
          <Num>9</Num>
          <Num>✏️</Num>
        </Numbers>
      </Root>
    </GameContext.Provider>
  );
};
