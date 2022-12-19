import {Request, Response} from 'express'
import { HttpResponse } from '../../shared/response/http-response';
import { AuthService } from '../services/auth.service'

export class AuthController{

    constructor(
        private readonly authService: AuthService = new AuthService(),
        private readonly httpResponse:HttpResponse = new HttpResponse()
    ){}

    getAll(_req:Request, res:Response){
        try {
            console.log('object');
            this.authService.getAll()
            this.httpResponse.Ok(res, `todo ok!!!`)
        } catch (error) {
            this.httpResponse.Error(res, error)
        }
    }

    createOne(_req:Request, res:Response){
        try {
            console.log('object');
            this.httpResponse.Create(res, `todo ok!!!`)
        } catch (error) {
            this.httpResponse.Error(res, error)
        }
    }
}