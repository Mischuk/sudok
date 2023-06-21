import { styled } from "styled-components";

export const Root = styled("div")`
  height: 10px;
  background: var(--button-bg);
  position: relative;

  &:first-child {
    border-bottom: 1px solid var(--button-bg-active);
  }
  &:last-child {
    border-top: 1px solid var(--button-bg-active);
  }
`;

export const Bar = styled("div")`
  height: 100%;
  position: absolute;
  left: -100%;
  top: 0;
  width: 100%;
  transition: all 1000ms ease;
`;
