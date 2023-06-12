import { styled } from "styled-components";

export const Root = styled("div")`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;
`;

export const DifficultSelector = styled("div")`
  width: calc(50% - 30px);
  height: 20%;
  color: black;
  margin-left: 15px;
  margin-right: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
  background: var(--button-bg);
  color: var(--button-color);
  font-weight: bold;
  border-radius: 5px;

  &:active {
    background: var(--button-bg-active);
  }
`;
