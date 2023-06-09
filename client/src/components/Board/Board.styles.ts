import { styled } from "styled-components";

export const Root = styled("div")`
  height: 0;
  padding-bottom: 100%;
  position: relative;
`;

export const Rows = styled("div")`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: white;
  overflow: hidden;
  display: flex;
  flex-wrap: wrap;
`;
