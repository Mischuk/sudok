import { FC, PropsWithChildren } from "react";
import { Root, Value } from "./Num.styles";

interface Props {
  onClick?: () => void;
}

export const Num: FC<PropsWithChildren<Props>> = ({ children, onClick }) => {
  return (
    <Root onClick={onClick}>
      <Value>{children}</Value>
    </Root>
  );
};
