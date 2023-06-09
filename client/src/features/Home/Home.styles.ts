import { styled } from "styled-components";

export const Root = styled("div")`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
`;

export const InfoPanel = styled("div")`
  position: fixed;
  left: 0;
  bottom: 0;
  height: 40px;
  background-color: black;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export const Waiting = styled("div")`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
`;
