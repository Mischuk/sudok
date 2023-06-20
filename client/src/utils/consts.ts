import { GameCell } from "utils";

export const LS = {
  userId: "userId",
};

export const INITIAL_CELL: GameCell = {
  value: null,
  answer: 0,
  notes: [],
  error: false,
  highlighted: false,
};

export const MIN_PLAYERS = 2;

export const SQUARES = [
  {
    square: 0,
    variants: [],
    cells: [
      { row: 0, col: 0 },
      { row: 0, col: 1 },
      { row: 0, col: 2 },

      { row: 1, col: 0 },
      { row: 1, col: 1 },
      { row: 1, col: 2 },

      { row: 2, col: 0 },
      { row: 2, col: 1 },
      { row: 2, col: 2 },
    ],
  },
  {
    square: 1,
    variants: [],
    cells: [
      { row: 0, col: 3 },
      { row: 0, col: 4 },
      { row: 0, col: 5 },

      { row: 1, col: 3 },
      { row: 1, col: 4 },
      { row: 1, col: 5 },

      { row: 2, col: 3 },
      { row: 2, col: 4 },
      { row: 2, col: 5 },
    ],
  },
  {
    square: 2,
    variants: [],
    cells: [
      { row: 0, col: 6 },
      { row: 0, col: 7 },
      { row: 0, col: 8 },

      { row: 1, col: 6 },
      { row: 1, col: 7 },
      { row: 1, col: 8 },

      { row: 2, col: 6 },
      { row: 2, col: 7 },
      { row: 2, col: 8 },
    ],
  },

  {
    square: 3,
    variants: [],
    cells: [
      { row: 3, col: 0 },
      { row: 3, col: 1 },
      { row: 3, col: 2 },

      { row: 4, col: 0 },
      { row: 4, col: 1 },
      { row: 4, col: 2 },

      { row: 5, col: 0 },
      { row: 5, col: 1 },
      { row: 5, col: 2 },
    ],
  },
  {
    square: 4,
    variants: [],
    cells: [
      { row: 3, col: 3 },
      { row: 3, col: 4 },
      { row: 3, col: 5 },

      { row: 4, col: 3 },
      { row: 4, col: 4 },
      { row: 4, col: 5 },

      { row: 5, col: 3 },
      { row: 5, col: 4 },
      { row: 5, col: 5 },
    ],
  },
  {
    square: 5,
    variants: [],
    cells: [
      { row: 3, col: 6 },
      { row: 3, col: 7 },
      { row: 3, col: 8 },

      { row: 4, col: 6 },
      { row: 4, col: 7 },
      { row: 4, col: 8 },

      { row: 5, col: 6 },
      { row: 5, col: 7 },
      { row: 5, col: 8 },
    ],
  },

  {
    square: 6,
    variants: [],
    cells: [
      { row: 6, col: 0 },
      { row: 6, col: 1 },
      { row: 6, col: 2 },

      { row: 7, col: 0 },
      { row: 7, col: 1 },
      { row: 7, col: 2 },

      { row: 8, col: 0 },
      { row: 8, col: 1 },
      { row: 8, col: 2 },
    ],
  },
  {
    square: 7,
    variants: [],
    cells: [
      { row: 6, col: 3 },
      { row: 6, col: 4 },
      { row: 6, col: 5 },

      { row: 7, col: 3 },
      { row: 7, col: 4 },
      { row: 7, col: 5 },

      { row: 8, col: 3 },
      { row: 8, col: 4 },
      { row: 8, col: 5 },
    ],
  },
  {
    square: 8,
    variants: [],
    cells: [
      { row: 6, col: 6 },
      { row: 6, col: 7 },
      { row: 6, col: 8 },

      { row: 7, col: 6 },
      { row: 7, col: 7 },
      { row: 7, col: 8 },

      { row: 8, col: 6 },
      { row: 8, col: 7 },
      { row: 8, col: 8 },
    ],
  },
];

export const BOXES = () => {
  return SQUARES.map((s) => {
    return {
      square: s.square,
      cells: s.cells,
      variants: s.cells.map((c) => {
        return `row${c.row}col${c.col}`;
      }),
    };
  });
};
