import { Response } from "express";

export enum HttpStatus{
    OK=200,
    CREATE=201,
    BAD_REQUEST=400,
    NOT_FOUND=404,
    UNAUTHORIZED=401,
    FORBIDDEN=403,
    INTERNAL_SERVER_ERROR=500
}

export class HttpResponse{
    Ok(res:Response, data:any){
        return res.status(HttpStatus.OK).json({
            status:HttpStatus.OK,
            message:"Success",
            data:data
        })
    }

    Create(res:Response, data:any):Response{
        return res.status(HttpStatus.CREATE).json({
            status:HttpStatus.CREATE,
            message:"Create successfull",
            data:data
        })
    }

    NotFound(res:Response, data:any):Response{
        return res.status(HttpStatus.NOT_FOUND).json({
            status:HttpStatus.NOT_FOUND,
            message:"Not Found",
            error:data
        })
    }

    Unauthorized(res:Response, data:any):Response{
        return res.status(HttpStatus.UNAUTHORIZED).json({
            status:HttpStatus.UNAUTHORIZED,
            message:"Unauthorizes",
            error:data
        })
    }

    Forbidden(res:Response, data:any):Response{
        return res.status(HttpStatus.FORBIDDEN).json({
            status:HttpStatus.FORBIDDEN,
            message:"Forbidden",
            error:data
        })
    }

    Error(res:Response, data:any):Response{
        if(data?.parent?.errno === 1062){
            return res.status(HttpStatus.BAD_REQUEST).json({
                status:HttpStatus.BAD_REQUEST,
                message:"Bad Request",
                data:data.parent.sqlMessage
            })
        // // }else if(data.length > 0){
        // //     return res.status(HttpStatus.BAD_REQUEST).json({
        // //         status:HttpStatus.BAD_REQUEST,
        // //         message:"Bad Request",
        // //         data:`${data[0].value} ${data[0].constraints.contains}`
        // //     })
        }else{
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                message: "Internal Server Error",
                data: data
            })
        }}
    
}