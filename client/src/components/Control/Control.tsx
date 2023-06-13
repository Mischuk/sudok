import { CSSProperties, FC, PropsWithChildren } from "react";
import { Icon as IconContainer, Label, Root } from "./Control.styles";
import { Icon, IconFilename } from "../Icon/Icon";

interface Props extends PropsWithChildren {
  onClick?: () => void;
  disabled?: boolean;
  label?: string;
  isActive?: boolean;
  styles?: CSSProperties;
  icon?: IconFilename;
}

export const Control: FC<Props> = ({
  onClick = () => {},
  children,
  label,
  disabled = false,
  isActive = false,
  styles = {},
  icon,
}) => {
  return (
    <Root onClick={onClick} $isDisabled={disabled} $isActive={isActive} style={styles}>
      {icon && (
        <IconContainer>
          <Icon name={icon} />
        </IconContainer>
      )}
      {label && <Label $isActive={isActive}>{label}</Label>}
    </Root>
  );
};
