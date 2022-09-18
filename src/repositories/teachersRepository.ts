import prisma from "../database/database";


export async function gettingTeacherByName(name:string){
    const teacher = await prisma.teachers.findUnique({
        where:{
            name
        }
    });
    return teacher;
}