import { css, styled } from "styled-components";

export const Root = styled("div")<{ $isSelected: boolean }>`
  width: 100%;
  height: calc(100% / 9);
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
      height: 1px;
      background-color: gray;
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
