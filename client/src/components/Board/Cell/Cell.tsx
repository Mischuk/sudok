import { FC } from "react";
import { Root } from "./Cell.styles";

interface Props {
  value: number | null;
}

export const Cell: FC<Props> = ({ value }) => {
  return <Root>{value}</Root>;
};
