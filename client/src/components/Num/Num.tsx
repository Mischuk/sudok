import { FC, PropsWithChildren } from "react";
import { Root, Value } from "./Num.styles";

interface Props {
  onClick?: () => void;
  isVisible: boolean;
  isNotes: boolean;
}

export const Num: FC<PropsWithChildren<Props>> = ({
  children,
  onClick,
  isVisible,
  isNotes,
}) => {
  return (
    <Root onClick={!isVisible ? onClick : () => {}} $isVisible={isVisible}>
      <Value $isNotes={isNotes}>{children}</Value>
    </Root>
  );
};
