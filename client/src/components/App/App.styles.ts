import { styled } from "styled-components";

export const Root = styled("div")`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
`;

export const LandscapeLocker = styled("div")`
  display: none;
  position: fixed;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  z-index: 9999;
  background-image: linear-gradient(to top, #fff1eb 0%, #ace0f9 100%);
  opacity: 0.9;

  @media screen and (orientation: landscape) {
    display: flex;
  }
`;
