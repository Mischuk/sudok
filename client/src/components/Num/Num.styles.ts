import { styled } from "styled-components";

export const Root = styled("div")`
  height: 0;
  min-width: 20%;
  padding-bottom: 20%;
  position: relative;
`;

export const Value = styled("div")`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 32px;
`;
