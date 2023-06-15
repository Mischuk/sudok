import { css, styled } from "styled-components";

export const Root = styled("div")<{ $isVisible: boolean }>`
  min-width: 33%;
  position: relative;
  flex: 1;
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;

  ${({ $isVisible }) =>
    $isVisible &&
    css`
      opacity: 0;
    `}
`;

export const Value = styled("div")<{ $isNotes: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 32px;
  background-color: var(--button-bg);
  flex: 1;
  height: 100%;
  color: var(--button-color);
  border-radius: 4px;

  &:active {
    background-color: var(--button-bg-active);
  }

  ${({ $isNotes }) =>
    $isNotes &&
    css`
      color: var(--button-color-notes);
    `}
`;
