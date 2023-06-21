import { styled } from "styled-components";
import { ProgressBar } from "../../../../components/ProgressBar/ProgressBar";
import { FC, useContext, useMemo } from "react";
import { AuthContext } from "../../../Auth/Auth.context";
import { Progress as I_Progress } from "utils";

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

  return (
    <Root>
      <ProgressBar value={sortedValues[0]?.value || 1} color="#7ac452" />
      <ProgressBar value={sortedValues[1]?.value || 1} color="#f76464" />
    </Root>
  );
};
