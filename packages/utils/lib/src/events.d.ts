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
        PING: {
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
        END: string;
        RESTART: {
            CLIENT: string;
            SERVER: string;
        };
    };
    CELL: {
        OPENED: string;
        TIPED: {
            CLIENT: string;
            SERVER: string;
        };
        MISTAKE: {
            CLIENT: string;
            SERVER: string;
        };
    };
};
