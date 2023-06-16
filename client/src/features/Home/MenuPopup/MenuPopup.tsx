import { FC } from "react";
import { styled } from "styled-components";

const Root = styled("div")`
  position: fixed;
  left: 0;
  top: 0;
  backdrop-filter: blur(25px);
  z-index: 9999;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

interface Props {}

export const MenuPopup: FC<Props> = () => {
  return (
    <Root>
      <div>New game</div>
    </Root>
  );
};
