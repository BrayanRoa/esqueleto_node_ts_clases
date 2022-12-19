import { Router } from "express";

//* EL GENERICO T ES PARA EL CONTROLADOR
export class BaseRouter<T, U>{
    public router:Router;
    public controller:T
    public middleware:U

    constructor(TController:{new ():T}, UMiddleware:{new ():U}){
        this.router = Router()
        this.controller = new TController()
        this.middleware = new UMiddleware()
        this.routes()
    }
    routes(){}
}