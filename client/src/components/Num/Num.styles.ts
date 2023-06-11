import { styled } from "styled-components";

export const Root = styled("div")`
  height: 0;
  min-width: 20%;
  padding-bottom: 20%;
  position: relative;
`;

export const Value = styled("div")`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 32px;
`;

export const Status = styled("div")`
  position: absolute;
  right: 0;
  top: 0;
  background-color: #70a3f9;
  color: #fff;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
`;
