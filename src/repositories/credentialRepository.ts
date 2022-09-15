import { prisma } from "../database/database";
import { ICredentialReqBody } from "../types/credentialTypes";


//creating
export async function gettingCredentialByName(name:string,userId:number){
    const credential = await prisma.credentials.findFirst({
        where:{
            name,
            userId
        }
    });
    return credential;
}

export async function storing({name,url,userName,password,userId}:ICredentialReqBody){
    await prisma.credentials.create({
        data: {
            name,
            url,
            userName,
            password,
            userId
        }
    });
}

//gettingOne

export async function gettingOneCredential(id:number,userId:number){
    const credential = await prisma.credentials.findFirst({
        where:{
            id,
            userId
        }
    });
    return credential;
}

//gettingAll

export async function gettingAll(userId:number){
    const credentials = await prisma.credentials.findMany({
        where:{
            userId
        }
    });
    return credentials;
}

//gettingOne

export async function deleteCredential(id:number){
    const credential = await prisma.credentials.delete({
        where:{
            id
        }
    });
}