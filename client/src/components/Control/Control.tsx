import { CSSProperties, FC, PropsWithChildren } from "react";
import { Icon, Label, Root } from "./Control.styles";

interface Props extends PropsWithChildren {
  onClick?: () => void;
  disabled?: boolean;
  label?: string;
  isActive?: boolean;
  styles?: CSSProperties;
}

export const Control: FC<Props> = ({
  onClick = () => {},
  children,
  label,
  disabled = false,
  isActive = false,
  styles = {},
}) => {
  return (
    <Root onClick={onClick} $isDisabled={disabled} $isActive={isActive} style={styles}>
      <Icon>{children}</Icon>
      {label && <Label $isActive={isActive}>{label}</Label>}
    </Root>
  );
};
