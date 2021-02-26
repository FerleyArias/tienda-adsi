//Usamos dotenv para no tener que colocar un puerto en específico
import {} from "dotenv/config.js";
import { Server } from "./models/server.js";

const server = new Server();

server.listen();
