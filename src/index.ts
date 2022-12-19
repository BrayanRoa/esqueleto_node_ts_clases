import express, { Application } from "express";
import morgan from "morgan";
import cors from "cors";

import './helpers/expandir-express'
import { ConfigServer } from "./config/config";
import { AuthRouter } from "./auth/auth.router";

class Server extends ConfigServer {
  private readonly app: Application;
  private readonly PORT: number;

  constructor() {
    super();
    this.app = express();
    this.PORT = this.getNumberEnv("PORT") || 3000; 
    this.dbConnect();
    this.middlewares();
    this.app.use("/api", this.routers());
  }

  middlewares() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(morgan("dev"));
    this.app.use(cors());
  }

  routers(): express.Router[] {
    return [new AuthRouter().router];
  }

  listen() {
    this.app.listen(this.PORT, () => {
      console.log(
        `Server running on port ${this.PORT} - http://localhost:${this.PORT}`
      );
    });
  }
}

new Server().listen()
