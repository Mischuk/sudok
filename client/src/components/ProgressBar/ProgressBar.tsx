import { FC } from "react";
import { Bar, Root } from "./ProgressBar.styles";

interface Props {
  value: number;
  color: string;
}

export const ProgressBar: FC<Props> = ({ value, color }) => {
  return (
    <Root>
      <Bar style={{ transform: `translateX(${value}%)`, background: color }} />
    </Root>
  );
};
