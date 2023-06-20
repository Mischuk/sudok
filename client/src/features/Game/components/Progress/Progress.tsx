import { styled } from "styled-components";
import { ProgressBar } from "../../../../components/ProgressBar/ProgressBar";
import { FC, useContext, useMemo } from "react";
import { AuthContext } from "../../../Auth/Auth.context";
import { Progress as I_Progress } from "utils";
import { MIN_PLAYERS } from "../../../../utils/consts";

const Root = styled("div")`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
`;

interface Props {
  values: I_Progress[];
}

export const Progress: FC<Props> = ({ values }) => {
  const { id } = useContext(AuthContext);

  const sortedValues = useMemo(
    () => values.sort((a) => (a.id === id ? -1 : 1)),
    [values, id]
  );

  // Hide progress on single or null players
  if (values.length !== MIN_PLAYERS) return null;

  const [me, secondPlayer] = sortedValues;

  return (
    <Root>
      <ProgressBar value={me.value} color="#7ac452" />
      <ProgressBar value={secondPlayer.value} color="#f76464" />
    </Root>
  );
};
