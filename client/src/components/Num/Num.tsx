import { FC, PropsWithChildren } from "react";
import { Root, Value } from "./Num.styles";

interface Props {}

export const Num: FC<PropsWithChildren<Props>> = ({ children }) => {
  return (
    <Root>
      <Value>{children}</Value>
    </Root>
  );
};
