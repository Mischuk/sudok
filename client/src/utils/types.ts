export type CellNotes = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export type AbortControl = AbortController | null;

export type ErrorResponse<T> = {
  message: string;
  field: T;
};

export type CellValue = number | null;

export interface GameCell {
  value: CellValue;
  answer: number;
  notes: CellNotes[];
  error: boolean;
  highlighted?: boolean;
}

export interface GameRow {
  id: number;
  cells: GameCell[];
}
