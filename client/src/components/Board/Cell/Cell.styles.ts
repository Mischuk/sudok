import { css, styled } from "styled-components";

export const NumNote = styled("div")<{
  $isActive: boolean;
  $isSelected: boolean;
}>`
  font-size: 11px;
  line-height: 1;
  position: absolute;
  width: 33.333%;
  height: 33.333%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(prop) => (prop.$isSelected ? "#666666" : "#a3a3a3")};

  ${({ $isActive }) => {
    return (
      $isActive &&
      css`
        font-weight: bold;
        color: #000;
      `
    );
  }}
`;

export const Root = styled("div")<{
  $isSelected: boolean;
  $isHighlighted: boolean;
  $isActive: boolean;
}>`
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
    border-right: 1px solid black;
  }

  ${({ $isHighlighted }) => {
    return (
      $isHighlighted &&
      css`
        background: var(--select-axis);
      `
    );
  }}

  ${({ $isActive }) => {
    return (
      $isActive &&
      css`
        background: var(--select-number);
      `
    );
  }}

  ${({ $isSelected }) => {
    return (
      $isSelected &&
      css`
        background: var(--select-cell);
      `
    );
  }}
`;
