import { FC } from "react";
import { Bar, Root } from "./ProgressBar.styles";

interface Props {
  value: number;
}

export const ProgressBar: FC<Props> = ({ value }) => {
  return (
    <Root>
      <Bar style={{ transform: `translateX(${value}%)` }} />
    </Root>
  );
};
