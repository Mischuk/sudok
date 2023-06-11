import { FC, PropsWithChildren } from "react";
import { Icon, Root } from "./Control.styles";

interface Props extends PropsWithChildren {
  size?: number;
  onClick?: () => void;
  disabled?: boolean;
}

export const Control: FC<Props> = ({
  size = 100,
  onClick = () => {},
  children,
  disabled = false,
}) => {
  return (
    <Root onClick={onClick} $isDisabled={disabled}>
      <Icon style={{ fontSize: `${size}%` }}>{children}</Icon>
    </Root>
  );
};
