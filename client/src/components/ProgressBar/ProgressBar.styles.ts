import { styled } from "styled-components";

export const Root = styled("div")`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 10px;
  background: #ff6464;
`;

export const Bar = styled("div")`
  height: 100%;
  background: #7ac452;
  position: absolute;
  left: -100%;
  top: 0;
  width: 100%;
  transition: all 500ms ease;
`;
