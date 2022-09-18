import prisma from "../database/database";


export async function gettingDisciplineByName(name:string){
    const discipline = await prisma.disciplines.findUnique({
        where:{
            name
        }
    });
    return discipline;
}