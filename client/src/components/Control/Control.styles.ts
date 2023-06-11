import { css, styled } from "styled-components";

interface RootProps {
  $isDisabled: boolean;
}

export const Root = styled("div")<RootProps>`
  height: 100%;
  width: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
  ${({ $isDisabled }) =>
    $isDisabled &&
    css`
      opacity: 0.1;
    `}
`;

export const Icon = styled("div")`
  font-size: 100%;
`;
