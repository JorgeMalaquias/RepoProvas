import prisma from "../database/database";

export async function gettingTermById(id:number){
    const term = await prisma.terms.findFirst({
        where:{
            id
        }
    });
    return term;
}