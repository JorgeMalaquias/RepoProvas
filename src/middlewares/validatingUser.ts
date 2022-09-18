import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import {gettingUserByEmail, gettingUserByIdAndEmail} from "../repositories/usersRepository"

export async function validatingUser(req: Request, res: Response,next:NextFunction) {
    const email = res.locals.userEmail;
    const id = req.body.userId;
    const user = await gettingUserByIdAndEmail(id,email);
    if(user===null){
        if(user===null){
            throw ({ type: 'unauthorized', message: 'token or id not valid' });
        }
    }
    next();
}