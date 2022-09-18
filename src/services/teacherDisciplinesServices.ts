import * as teachersDisciplinesRepository from "../repositories/teachersDisciplinesRepository";

export async function gettingTeachersDisciplinesId(teacherId:number,disciplineId:number){
    return await teachersDisciplinesRepository.gettingTeacherAndDisciplineByIds(teacherId,disciplineId);
}