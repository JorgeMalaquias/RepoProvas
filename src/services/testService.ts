import { ITestReq } from "../types/testTypes";
import * as testsRepository from "../repositories/testsRepository";
import * as termsServices from "./termsServices";
import * as teachersServices from "./teachersServices";
import * as teacherDisciplinesServices from "./teacherDisciplinesServices";
import * as disciplinesServices from "./disciplinesServices";
import * as categoriesServices from "./categoriesServices";

export async function postingNewTest({ name, pdfUrl, category, discipline, teacher, }: ITestReq) {

    const teacherDisciplineId = await gettingteacherDisciplineId(discipline, teacher);

    const categoryId = await gettingCategoryId(category);

    const newTest = await testsRepository.inserting(name, pdfUrl, categoryId, teacherDisciplineId);
    
    return newTest;
}


async function gettingCategoryId(categoryName: string) {
    const category = await categoriesServices.gettingCategoryByName(categoryName);
    if (category === null) {
        throw ({ type: 'not_found', message: 'The informed category does not exist' });
    }
    return category.id;
}

async function gettingteacherDisciplineId(disciplineName: string, teacherName: string) {

    const disciplineId = await gettingDisciplineId(disciplineName);
    const teacherId = await gettingTeacherId(teacherName);

    const teacherDiscipline = await teacherDisciplinesServices.gettingTeachersDisciplinesId(disciplineId, teacherId);

    if (teacherDiscipline === null) {
        throw ({ type: 'not_found', message: 'The informed teacher does not teach the informed discipline' });
    }
    return teacherDiscipline.id;
}

async function gettingDisciplineId(disciplineName: string) {
    const discipline = await disciplinesServices.gettingDisciplineByName(disciplineName);
    if (discipline === null) {
        throw ({ type: 'not_found', message: 'The informed discipline does not exist' });
    }
    return discipline.id;
}
async function gettingTeacherId(teacherName: string) {
    const teacher = await teachersServices.gettingTeacherByName(teacherName);
    if (teacher === null) {
        throw ({ type: 'not_found', message: 'The informed teacher does not exist' });
    }
    return teacher.id;
}