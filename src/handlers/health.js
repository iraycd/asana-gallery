let isShuttingDown = false;

function forceShutdown () {
  console.error("Could not close connections in time, forcefully shutting down.");
  process.exit()
}

function gracefulShutdown (server) {
  console.log("Received kill signal, shutting down gracefully.");
  server.close(process.exit);
  setTimeout(forceShutdown, 4*1000);
}

export default function health (req, res) {
  const {server} = req.socket;

  if (!!req.query.shutdown) {
    gracefulShutdown(server)
    isShuttingDown = true;
    res.sendStatus(503);
  }
  else if (isShuttingDown) {
    res.sendStatus(503);
  }
  else {
    res.sendStatus(200);
  }
}
