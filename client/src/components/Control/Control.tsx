import { FC, PropsWithChildren } from "react";
import { Icon, Root } from "./Control.styles";

interface Props extends PropsWithChildren {
  size?: number;
}

export const Control: FC<Props> = ({ size = 100, children }) => {
  return (
    <Root>
      <Icon style={{ fontSize: `${size}%` }}>{children}</Icon>
    </Root>
  );
};
