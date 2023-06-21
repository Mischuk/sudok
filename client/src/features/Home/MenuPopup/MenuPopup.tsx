import { FC } from "react";
import { styled } from "styled-components";
import { socket } from "../../../api/instances";
import { EVENTS } from "utils";

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
  flex-direction: column;
`;

const Text = styled("div")`
  justify-content: center;
  text-transform: uppercase;
  font-size: 30vw;
  font-weight: bold;
  text-shadow: 10px 10px 0 rgba(0, 0, 0, 0.5);
  letter-spacing: -1vw;
`;

const Button = styled("div")`
  margin-top: 4vw;
  font-size: 4vw;
  background: var(--button-bg);
  color: var(--button-color);
  text-transform: uppercase;
  padding: 2vw 4vw;
  border-radius: 1vw;
  box-shadow: 0.5vw 0.5vw rgba(0, 0, 0, 0.2);
`;
interface Props {
  win: boolean;
}

export const MenuPopup: FC<Props> = ({ win }) => {
  const onRequestRestart = () => socket.emit(EVENTS.GAME.RESTART.CLIENT);

  return (
    <Root>
      <Text style={{ color: win ? "#7ac452" : "#f76464" }}>{win ? "win" : "defeat"}</Text>
      <Button onClick={onRequestRestart}>New game</Button>
    </Root>
  );
};
