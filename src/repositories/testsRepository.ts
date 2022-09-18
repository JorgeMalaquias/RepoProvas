import prisma from "../database/database";


export async function gettingUserByEmail(email:string){
    const user = await prisma.users.findUnique({
        where:{
            email
        }
    });
    return user;
}
export async function gettingUserById(id:number){
    const user = await prisma.users.findFirst({
        where:{
            id
        }
    });
    return user;
}


export async function inserting(name:string,pdfUrl:string,categoryId:number,teacherDisciplineId:number){
    const newTest = await prisma.tests.create({
        data: {
            name,
            pdfUrl,
            categoryId,
            teacherDisciplineId
        }
    });
    return newTest;
}