import prisma from "../database/database";

export async function gettingTeacherAndDisciplineByIds(teacherId:number,disciplineId:number){
    const teachersDisciplines = await prisma.teachersDisciplines.findFirst({
        where:{
            teacherId,
            disciplineId
        }
    });
    return teachersDisciplines;
}