import { CellCoordinates } from "../features/Game/Game.types";

export type AbortControl = AbortController | null;

export type ErrorResponse<T> = {
  message: string;
  field: T;
};

export interface Axis {
  value: number;
  position: CellCoordinates;
}
