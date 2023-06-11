import { FC, PropsWithChildren } from "react";
import { Root, Status, Value } from "./Num.styles";

type InputNum = "num" | "note";

interface Props {
  isActive?: boolean;
  type?: InputNum;
  onClick?: () => void;
}

export const Num: FC<PropsWithChildren<Props>> = ({
  type = "num",
  children,
  isActive,
  onClick,
}) => {
  return (
    <Root onClick={onClick}>
      {type === "note" && isActive && <Status />}
      <Value>{children}</Value>
    </Root>
  );
};
