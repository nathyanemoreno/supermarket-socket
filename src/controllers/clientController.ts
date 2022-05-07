import { Socket } from "net";
import crypto from "crypto";
import { Client, ControllerResponse } from ".";

let client: Client = {};
let clients: Client[] = [{ name: "admin" }];

export function clientController(
  socket: Socket,
  options: string[],
): ControllerResponse<Client> {
  switch (options[1]) {
    case "register":
      client.name = options[2];
      client.address = options.slice(3, options.length).join(" ");
      client.uuid = crypto.randomUUID();

      if (!client.name || !client.address) {
        return {
          message: "REGISTER: missing argument: name|address; no client registered;\n Use CREATE command to register a client.",
          error: "MISSING_ARGUMENT",
        };
      }
      clients.push(client);
      client = {};
      return {
        message: `Client #${clients.length} registered successfully`,
        data: clients[clients.length - 1],
      };

    default:
      return { message: "Invalid argument" };
  }
}
