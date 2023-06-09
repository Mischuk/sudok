import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { ioServerOptions } from "./configs/options";
import { EVENTS } from "./enums/ws.events";
import { ServerClient } from "./models/ServerClient";
import RouteAuth from "./routes/auth.routes";
import RouteMessage from "./routes/messages.routes";
import RouteAll from "./routes/all.routes";
import { PORT } from "./utils/constants";
import { Diff } from "./enums";
import { readFile } from "./utils/fs";
import { getRandomInt } from "./utils";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, ioServerOptions);

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use("/api/auth", RouteAuth);
app.use("/api/messages", RouteMessage);
app.use("/api/all", RouteAll);

const DTO_Players = (players: ServerClient[]) =>
  players.map(({ id, charCode }) => ({
    id,
    charCode,
  }));
interface GameDiff {
  socketId: string;
  diff: Diff;
}

const updateSelectDiff = ({
  gameDiff,
  id,
  diff,
}: {
  diff: Diff;
  gameDiff: GameDiff[];
  id: string;
}) => {
  const temp = [...gameDiff];
  const findIdx = temp.findIndex((el) => el.socketId === id);

  if (findIdx >= 0) {
    temp.splice(findIdx, 1);
  }

  temp.push({
    socketId: id,
    diff,
  });

  return temp;
};

const getSelectedDiffState = ({ gameDiff }: { gameDiff: GameDiff[] }) => {
  const selectedDiffs = new Set(gameDiff.map(({ diff }) => diff));
  return {
    isReady: gameDiff.length === 2 && selectedDiffs.size === 1,
    difficult: gameDiff[0]?.diff?.toLowerCase() as Diff,
  };
};

const getPuzzlesFromFile = async (filename: string) => {
  const data = await readFile(`${filename}.json`);
  return data;
};

const getRandomPuzzle = async (diff: Diff) => {
  const puzzles: any = await getPuzzlesFromFile(diff);

  if (puzzles) {
    const { data = [] } = puzzles;
    const randomIndex = getRandomInt(0, data.length - 1);
    return data[randomIndex];
  }

  return null;
};

async function start() {
  try {
    const clients: ServerClient[] = [];
    let gameDiff: GameDiff[] = [];

    httpServer.listen(PORT);

    io.on(EVENTS.COMMON.CONNECTION, (socket) => {
      socket.on(EVENTS.PLAYER.CONNECT.CLIENT, async (data: { id: string; charCode: number }) => {
        const user = clients.find(({ id }) => id === data.id);

        if (!user) {
          clients.push({
            id: data.id,
            socketId: socket.id,
            charCode: data.charCode,
          });
        }

        const players = DTO_Players(clients);

        io.emit(EVENTS.PLAYER.CONNECT.SERVER, { players });
      });

      socket.on(EVENTS.COMMON.DISCONNECT, async () => {
        const idx = clients.findIndex(({ socketId }) => socketId === socket.id);

        if (idx >= 0) {
          clients.splice(idx, 1);
          const players = DTO_Players(clients);
          socket.broadcast.emit(EVENTS.PLAYER.DISCONNECT.SERVER, { players });
        }
      });

      socket.on(EVENTS.DIFF.CLIENT, async ({ diff }: { diff: Diff }) => {
        io.emit(EVENTS.GAME.PREPARE.SERVER);
        const data = await getRandomPuzzle(diff);

        setTimeout(() => {
          io.emit(EVENTS.GAME.START.SERVER, { puzzle: data.puzzle, solution: data.solution });
        }, 500);
      });
    });
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

start();
