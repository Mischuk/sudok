import styled, { css } from "styled-components";
import { MAX_NUM } from "../../../../../utils/consts";

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
  $isGift: boolean;
}

export const Root = styled("div")<RootProps>`
  width: calc(100% / ${MAX_NUM});
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
    &:after {
      content: "";
      position: absolute;
      right: 0;
      top: -2px;
      width: 2px;
      height: calc(100% + 4px);
      background-color: black;
      z-index: 1;
    }
  }

  ${({ $isGift }) =>
    $isGift &&
    css`
      color: green;
      background: #c9f4c9;
    `}

  ${({ $isHighlighted }) =>
    $isHighlighted &&
    css`
      color: black;
      background: var(--select-axis);
    `}

  ${({ $isActive }) =>
    $isActive &&
    css`
      color: black;
      background: var(--select-number);
    `}


  ${({ $isSelected }) =>
    $isSelected &&
    css`
      color: black;
      background: var(--select-cell);
    `}

  ${({ $isError }) =>
    $isError &&
    css`
      background: #ffc8d2;
      color: #ea2f2f;
    `}
`;
