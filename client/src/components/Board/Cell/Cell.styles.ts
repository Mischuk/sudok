import { css, styled } from "styled-components";

interface NumNoteProps {
  $isActive: boolean;
  $isSelected: boolean;
}

export const NumNote = styled("div")<NumNoteProps>`
  font-size: 11px;
  line-height: 1;
  position: absolute;
  width: 33.333%;
  height: 33.333%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(prop) => (prop.$isSelected ? "#666666" : "#a3a3a3")};

  ${({ $isActive }) =>
    $isActive &&
    css`
      font-weight: bold;
      color: #000;
    `}
`;

interface RootProps {
  $isSelected: boolean;
  $isHighlighted: boolean;
  $isActive: boolean;
  $isError: boolean;
}

export const Root = styled("div")<RootProps>`
  width: calc(100% / 9);
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid lightgray;
  font-size: 24px;
  position: relative;

  &:nth-child(1),
  &:nth-child(2),
  &:nth-child(4),
  &:nth-child(5),
  &:nth-child(7),
  &:nth-child(8) {
    border-right: 1px solid lightgray;
  }
  &:nth-child(3),
  &:nth-child(6) {
    border-right: 2px solid black;
  }

  ${({ $isHighlighted }) =>
    $isHighlighted &&
    css`
      background: var(--select-axis);
    `}

  ${({ $isActive }) =>
    $isActive &&
    css`
      background: var(--select-number);
    `}


  ${({ $isSelected }) =>
    $isSelected &&
    css`
      background: var(--select-cell);
    `}

  ${({ $isError }) =>
    $isError &&
    css`
      background: #ffc8d2;
      color: #ea2f2f;
    `}
`;
