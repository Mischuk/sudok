import { FC } from "react";
import { styled } from "styled-components";

const Root = styled("div")`
  position: fixed;
  left: 0;
  top: 0;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(25px);
  -webkit-backdrop-filter: blur(25px);
  z-index: 9999;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
  font-size: 30vw;
  font-weight: bold;
  text-shadow: 10px 10px 0 rgba(0, 0, 0, 0.5);
`;

interface Props {
  win: boolean;
}

export const MenuPopup: FC<Props> = ({ win }) => {
  return (
    <Root>
      <div style={{ color: win ? "#7ac452" : "#f76464" }}>{win ? "win" : "defeat"}</div>
    </Root>
  );
};
