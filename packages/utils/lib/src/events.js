"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EVENTS = void 0;
exports.EVENTS = {
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
        UPDATE_PROGRESS: "GAME_UPDATE_PROGRESS",
        END: "GAME_END",
    },
    CELL: {
        OPENED: "CELL_OPENED",
        TIPED: {
            CLIENT: "C_CELL_TIPED",
            SERVER: "S_CELL_TIPED",
        },
    },
};
