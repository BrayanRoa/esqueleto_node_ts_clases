import * as dotenv from "dotenv";
import { sequelize } from "../db/conexion";

export abstract class ConfigServer {
    
  constructor() {
    const nodeNameEnv = this.createPathEnv(this.nodeEnv);
    console.log(nodeNameEnv);
    dotenv.config({
      path: nodeNameEnv,
    });
  }
  public getEnvironment(k: string): string | undefined {
    return process.env[k];
  }

  //* ESTE MÉTODO ES IGUAL AL DE ARRIBA SOLO QUE ESTE ME CONVIERTE LOS VARIABLES DE ENTONCES A NÚMERO COMO POR EJEMPLO LOS PUERTOS
  public getNumberEnv(k: string): number | undefined {
    return Number(this.getEnvironment(k)) || 3000;
  }

  get nodeEnv(): string {
    return this.getEnvironment("NODE_ENV")?.trim() || "";
  }

  public createPathEnv(path: string): string {
    const arrEnv: string[] = ["env"];
    console.log(arrEnv);
    if (path.length > 0) {
      const stringToArray = path.split(".");
      arrEnv.unshift(...stringToArray);
    }
    return "." + arrEnv.join(".");
  }

  async dbConnect() {
    try {
      await sequelize.sync({ force: false });
      console.log("Conexión Exitosa!!!");
    } catch (error) {
      console.log(`No se pudo establecer la conexion - ${error}`);
    }
  }
}
