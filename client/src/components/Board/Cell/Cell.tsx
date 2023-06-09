import { FC } from "react";
import { Root } from "./Cell.styles";
import { CellValue } from "../../../utils/types";

interface Props {
  value: CellValue;
}

export const Cell: FC<Props> = ({ value }) => {
  return <Root>{value}</Root>;
};
