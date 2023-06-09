import { styled } from "styled-components";

export const Root = styled("div")`
  height: 100%;
  width: 100%;
  padding-top: 30px;
  padding-bottom: 30px;
  display: flex;
  flex-direction: column;
`;

export const Numbers = styled("div")`
  display: flex;
  flex-wrap: wrap;
`;

export const Field = styled("div")``;

export const Header = styled("div")`
  display: flex;
  align-self: center;
  justify-content: space-between;
  width: 100%;
  padding: 0 8px;
  height: 60px;
`;

export const FieldActions = styled("div")`
  display: flex;
`;
