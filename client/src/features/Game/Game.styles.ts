import { styled } from "styled-components";

export const Root = styled("div")`
  height: 100%;
  width: 100%;
  padding-top: 10px;
  display: flex;
  flex-direction: column;
`;

export const Numbers = styled("div")`
  display: flex;
  flex-wrap: wrap;
  flex: 1;
  padding: 5px;
`;

export const Field = styled("div")`
  padding: 10px;
`;

export const Controls = styled("div")`
  display: flex;
  align-self: center;
  justify-content: space-between;
  width: 100%;
  padding: 0 10px;
  height: 60px;
`;

export const FieldActions = styled("div")`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

export const HealthStatus = styled("div")`
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
`;
