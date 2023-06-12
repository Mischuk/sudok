import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { ioServerOptions } from "./configs/options";
import { ServerClient } from "./models/ServerClient";
import RouteAuth from "./routes/auth.routes";
import RouteMessage from "./routes/messages.routes";
import RouteAll from "./routes/all.routes";
import { DTO_Players, getRandomPuzzle } from "./utils";
import { EVENTS, Diff, PORT } from "utils";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, ioServerOptions);

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use("/api/auth", RouteAuth);
app.use("/api/messages", RouteMessage);
app.use("/api/all", RouteAll);

async function start() {
  try {
    const clients: ServerClient[] = [];

    let game: any = {};

    httpServer.listen(PORT);

    io.on(EVENTS.COMMON.CONNECTION, (socket) => {
      socket.on(EVENTS.PLAYER.CONNECT.CLIENT, async (data: { id: string }) => {
        const user = clients.find(({ id }) => id === data.id);

        if (!user) {
          clients.push({
            id: data.id,
            socketId: socket.id,
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

        io.emit(EVENTS.GAME.START.SERVER, {
          puzzle: data.puzzle,
          solution: data.solution,
        });

        const closedCells = data.puzzle.split("").filter((item) => item === ".").length;

        game[clients[0].id] = closedCells;
        game[clients[1].id] = closedCells;
      });

      socket.on(
        EVENTS.CELL.OPENED,
        async ({ id, cells }: { id: string; cells: number }) => {
          const secondPlayer = clients.find((c) => c.id !== id);
          if (!secondPlayer) return;

          game[id] = cells;

          const total = game[clients[0].id] + game[clients[1].id];
          const p = total / 100;
          const num = cells / p;
          const cur = Math.round(num * 100) / 100;
          const res = {
            [id]: 100 - cur,
            [secondPlayer.id]: cur,
          };

          clients.forEach((c) => {
            io.to(c.socketId).emit(EVENTS.GAME.UPDATE_PROGRESS, res[c.id]);
          });
        }
      );
    });
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

start();
