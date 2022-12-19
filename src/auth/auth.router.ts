import { BaseRouter } from '../shared/router/router';
import { AuthController } from './controllers/aut.controller';
import { AuthMiddleware } from './middlewares/auth.middleware';

export class AuthRouter extends BaseRouter<AuthController, AuthMiddleware>{

    constructor(){
        super(AuthController, AuthMiddleware)
    }

    routes(): void {
        this.router.get('/auth', (req, res) => this.controller.getAll(req, res))
    }
}