import styled from "styled-components";

export const Root = styled("div")`
  height: 100%;
  width: 100%;
  padding-top: 20px;
  padding-bottom: 0px;
  display: flex;
  flex-direction: column;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
`;

export const BoardField = styled("div")`
  padding: 10px;
  max-width: 500px;
`;

export const Controls = styled("div")`
  display: flex;
  align-self: center;
  justify-content: space-between;
  width: 100%;
  padding: 0 10px;
  height: 60px;
`;
