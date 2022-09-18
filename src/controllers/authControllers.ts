import { Request, Response } from 'express';
import * as authService from '../services/authService';
import { TypeUser } from "../types/userTypes";

export async function registering(req:Request,res:Response){
    
    const newuser = await authService.registering(req.body);
    res.status(201).send(newuser);
}

export async function logging(req:Request,res:Response){

    const token = await authService.logging(req.body);
    res.status(200).send({token});
    
}