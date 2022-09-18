import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import {gettingUserByEmail} from "../repositories/usersRepository"

export async function validatingToken(req: Request, res: Response,next:NextFunction) {
    const { authorization } = req.headers;
    if (!authorization) {
        throw ({ type: 'unauthorized', message: 'token was not informed or not valid' });
    }
    const token = authorization?.replace("Bearer ", "");
    const jwtKey:string|any = process.env.JWT_SECRET;
    const data = jwt.verify(token, jwtKey);
    if(!data){
        throw ({ type: 'unauthorized', message: 'token was not informed or not valid' });
    }
    
    res.locals.userId = data;
    next();
}