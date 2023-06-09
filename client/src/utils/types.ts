export type AbortControl = AbortController | null;
export type ErrorResponse<T> = {
  message: string;
  field: T;
};

export type CellValue = number | null;
