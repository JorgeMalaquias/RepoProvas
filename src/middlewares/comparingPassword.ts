import { Request, Response, NextFunction } from "express";


export default function comparingPasswords(req: Request,res: Response,next: NextFunction){
    if(req.body.password!==req.body.confirmPassword){
        throw ({ type: 'conflict', message: 'The passwords does not match' });
    }
    next();
}