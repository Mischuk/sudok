import { styled } from "styled-components";

export const Root = styled("div")`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;
`;

export const DifficultSelector = styled("div")<{ $active?: boolean }>`
  width: calc(50% - 30px);
  height: 20%;
  background-color: ${(props) => (props.$active ? "#8ecdb5" : "white")};
  color: black;
  margin-left: 15px;
  margin-right: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
  box-shadow: 6px 6px 0
    ${(props) => (props.$active ? "rgba(50, 50, 50, 0.5)" : "rgba(0, 0, 0, 0.1)")};
`;
