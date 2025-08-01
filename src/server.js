import http from "node:http";
import { middleware } from './middleware.js';

const host = "localhost";
const port = 8084;

const server = http.createServer(async (req, res) => {
  await middleware(req, res);

  res.end('running');
});

const initServer = () => {
  server.listen(port, host, () => {
    console.log(`Server listening on ${host}:${port}`);
  });
};

server.on("error", (err) => {
  console.log(err);

  if (err?.code === "EADDRINUSE") {
    console.log("Address already in use. Retrying to init the server...");

    setTimeout(() => {
      server.close();
      initServer();
    }, 1000);
  }
});

initServer();