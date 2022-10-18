import "./config/dotenv";
import net, { Socket } from "net";
import { clientController } from "./controllers/clientController";
import { menuController } from "./controllers/menuController";
import { orderController } from "./controllers/orderController";

let sockets: Socket[] = [];

const connListener = (socket: Socket) => {
  server.on("connection", (stream: string) => {
    sockets.push(socket);
  });

  socket.on("data", (data: string) => handleInput(socket, data));

  socket.on("close", () => {
    sockets = sockets.filter((s) => s !== socket);
    console.log("Disconnected");
  });
};

const handleInput = (socket: Socket, data: string) => {
  const request = data.toString().trim();
  const args = request.split(" ");
  let response = {};

  // UseCase Controller routes
  switch (args[0]) {
    case "client":
      response = clientController(socket, args);
      break;
    case "menu":
      response = menuController(socket, args);
      break;
    case "order":
      response = orderController(socket, args);
      break;
    case "exit":
      response = { message: "Disconnected from server." };
      break;
    default:
      response = { message: "Missing or invalid command" };
      break;
  }
  socket.write(JSON.stringify(response));
};

const server = net.createServer(connListener);

server.listen(Number(process.env.SERVER_PORT), "0.0.0.0", () =>
  console.log("Server is running at " + process.env.SERVER_PORT)
);
