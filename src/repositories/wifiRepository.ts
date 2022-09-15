import { prisma } from "../database/database";
import { IWifiBody } from "../types/wifiTypes";


//creating
export async function gettingwifiByName(title:string,userId:number){
    const wifi = await prisma.wiFis.findFirst({
        where:{
            title,
            userId
        }
    });
    return wifi;
}

export async function storing({title,name,password,userId}:IWifiBody){
    await prisma.wiFis.create({
        data: {
            title,
            name,
            password,
            userId
        }
    });
}

//gettingOne

export async function gettingOnewifi(id:number,userId:number){
    const wifi = await prisma.wiFis.findFirst({
        where:{
            id,
            userId
        }
    });
    return wifi;
}

//gettingAll

export async function gettingAll(userId:number){
    const wifis = await prisma.wiFis.findMany({
        where:{
            userId
        }
    });
    return wifis;
}

//gettingOne

export async function deletewifi(id:number){
    await prisma.wiFis.delete({
        where:{
            id
        }
    });
}