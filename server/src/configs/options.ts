import { ServerOptions } from "socket.io";

const ioServerOptions: Partial<ServerOptions> = {
  cors: {
    origin: ["http://localhost:3000", "http://10.0.1.3:3000"],
    methods: ["GET", "POST"],
  },
};

export { ioServerOptions };
