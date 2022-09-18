import { Request, Response, NextFunction } from "express";


export default function comparingPasswords(req: Request,res: Response,next: NextFunction){
    if(req.body.password!==req.body.confirmPassword){
        throw ({ type: 'passwords_do_not_match', message: 'The passwords does not match' });
    }
    next();
}