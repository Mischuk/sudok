import { FC } from "react";
import { Bar, Root } from "./ProgressBar.styles";

interface Props {
  value: number;
  position: "top" | "bottom";
}

export const ProgressBar: FC<Props> = ({ position, value }) => {
  const getStyles = () => {
    if (position === "top") {
      return { top: 0 };
    }

    if (position === "bottom") {
      return { bottom: 0 };
    }
  };
  return (
    <Root style={{ ...getStyles() }}>
      <Bar style={{ transform: `translateX(${value}%)` }} />
    </Root>
  );
};
