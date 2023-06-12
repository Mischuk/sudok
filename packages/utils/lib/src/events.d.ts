export declare const EVENTS: {
    COMMON: {
        CONNECTION: string;
        DISCONNECT: string;
    };
    PLAYER: {
        CONNECT: {
            SERVER: string;
            CLIENT: string;
        };
        DISCONNECT: {
            SERVER: string;
            CLIENT: string;
        };
    };
    DIFF: {
        SERVER: string;
        CLIENT: string;
    };
    GAME: {
        START: {
            SERVER: string;
        };
        PREPARE: {
            SERVER: string;
        };
        UPDATE_PROGRESS: string;
    };
    CELL: {
        OPENED: string;
        TIPED: {
            CLIENT: string;
            SERVER: string;
        };
    };
};
