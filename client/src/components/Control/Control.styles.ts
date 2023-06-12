import { css, styled } from "styled-components";

interface RootProps {
  $isDisabled: boolean;
  $isActive: boolean;
}

export const Root = styled("div")<RootProps>`
  height: 100%;
  width: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
  background-color: var(--button-bg);
  border-radius: 50%;
  position: relative;
  border: 2px solid var(--button-bg);

  &:active {
    background-color: var(--button-bg-active);
  }

  ${({ $isDisabled }) =>
    $isDisabled &&
    css`
      opacity: 0.9;
    `}
  ${({ $isActive }) =>
    $isActive &&
    css`
      border-color: var(--button-color);
    `}
`;

export const Icon = styled("div")`
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

export const Label = styled("div")<{ $isActive: boolean }>`
  position: absolute;
  right: -4px;
  top: -4px;
  background-color: var(--button-color);
  color: white;
  font-size: 12px;
  font-weight: bold;
  height: 20px;
  border-radius: 10px;
  padding-left: 6px;
  padding-right: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  ${({ $isActive }) =>
    !$isActive &&
    css`
      background-color: #adb6c2;
    `}
`;
