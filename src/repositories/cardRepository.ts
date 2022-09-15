import { prisma } from "../database/database";
import { ICardBody } from "../types/cardTypes";


//creating
export async function gettingCardByName(name:string,userId:number){
    const card = await prisma.cards.findFirst({
        where:{
            name,
            userId
        }
    });
    return card;
}

export async function storing({title,number,name,securityCode,expirationDate,password,isVirtual,type,userId}:ICardBody){
    await prisma.cards.create({
        data: {
            title,
            number,
            name,
            securityCode,
            expirationDate,
            password,
            isVirtual,
            type,
            userId
        }
    });
}

//gettingOne

export async function gettingOneCard(id:number,userId:number){
    const card = await prisma.cards.findFirst({
        where:{
            id,
            userId
        }
    });
    return card;
}

//gettingAll

export async function gettingAll(userId:number){
    const cards = await prisma.cards.findMany({
        where:{
            userId
        }
    });
    return cards;
}

//gettingOne

export async function deleteCard(id:number){
    await prisma.cards.delete({
        where:{
            id
        }
    });
}