import * as usersRepository from "../repositories/usersRepository";
import { TypeUser } from "../types/userTypes";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
dotenv.config();


export async function registering({email,password}:TypeUser){
    await verifyingEmail(email);
    const newUser  = await usersRepository.registering(email,cripting(password));
    return newUser;
}

export async function logging({email,password}:TypeUser){
    const user  = await usersRepository.gettingUserByEmail(email);
    if(user){
        checkingPassword(password,user.password);
        return generatingToken(user.id.toString());
    }else{
        throw ({ type: 'not_found', message: 'User not found' });
    }
}




async function verifyingEmail(email:string){
    const user = await usersRepository.gettingUserByEmail(email);
    if(user!==null){
        throw ({ type: 'conflict', message: 'This email is already been used' });
    }
}

function cripting(string: string): string {
    return bcrypt.hashSync(string, 10);
}

function checkingPassword(password:string, encryptedPassword:string | any){
    if(!bcrypt.compareSync(password,encryptedPassword)){
        throw ({ type: 'unauthorized', message: 'Invalid credentials' });
    };
}

function generatingToken(info:string):string{
    const jwtKey:string|any = process.env.JWT_SECRET;
    const token = jwt.sign(info,jwtKey);
    if(!token){
        throw ({ message: 'Error in generating token' });
    }
    return token;
}