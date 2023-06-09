enum WS {
  CONNECTION = "connection",
  DISCONNECT = "disconnect",
}

const EVENTS = {
  COMMON: {
    CONNECTION: "connection",
    DISCONNECT: "disconnect",
  },
  PLAYER: {
    CONNECT: {
      SERVER: "S_PLAYER_CONNECT",
      CLIENT: "C_PLAYER_CONNECT",
    },
    DISCONNECT: {
      SERVER: "S_PLAYER_DISCONNECT",
      CLIENT: "C_PLAYER_DISCONNECT",
    },
  },
  DIFF: {
    SERVER: "S_DIFF",
    CLIENT: "C_DIFF",
  },
  GAME: {
    START: {
      SERVER: "S_GAME_START",
    },
    PREPARE: {
      SERVER: "S_GAME_PREPARE",
    },
  },
};

export { WS, EVENTS };
