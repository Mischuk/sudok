import { styled } from "styled-components";

export const Root = styled("div")`
  width: 100%;
  height: calc(100% / 9);
  position: relative;
  &:nth-child(3),
  &:nth-child(6) {
    border-bottom: 1px solid gray;
  }
`;

export const Cells = styled("div")`
  position: absolute;
  left: 0;
  top: 0;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  height: 100%;
`;
