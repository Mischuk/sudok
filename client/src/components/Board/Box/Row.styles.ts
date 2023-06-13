import { css, styled } from "styled-components";
import { MAX_NUM } from "../../../utils/consts";

export const Root = styled("div")<{ $isSelected: boolean }>`
  width: 100%;
  height: calc(100% / ${MAX_NUM});
  position: relative;

  ${(props) =>
    props.$isSelected &&
    css`
      background: var(--select-axis);
    `}

  &:nth-child(3),
  &:nth-child(6) {
    &:after {
      content: "";
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 2px;
      background-color: black;
    }
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
