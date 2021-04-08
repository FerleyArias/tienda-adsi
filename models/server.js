import express from "express";
import cors from "cors";
import mongoConnection from "../database/config.js";
import category from "../routes/category.js";
import user from "../routes/user.js";
import authentication from "../routes/authentication.js";
import item from "../routes/item.js"
import person from "../routes/person.js"
import sale from "../routes/sale.js"
import shopping from "../routes/shopping.js"
class Server {
  constructor() {
    //Definimos el puerto en una variable de entorno
    this.port = process.env.PORT;
    //Instanciamos express
    this.app = express();
    //Conectar a la base de datos en mongo
    this.myConnection();
    //Llamar middlewares
    this.middlewares();
    //Definir rutas
    this.routes();
  }
  routes() {
    this.app.use("/api/category", category);
    this.app.use("/api/user", user);
    this.app.use("/api/authentication", authentication);
    this.app.use("/api/item", item);
    this.app.use("/api/person", person);
    this.app.use("/api/sale", sale);
    this.app.use("/api/shopping", shopping);
  }

  async myConnection() {
    await mongoConnection();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.static("public"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Servidor iniciado en el puerto ${this.port}`);
    });
  }
}

export { Server };