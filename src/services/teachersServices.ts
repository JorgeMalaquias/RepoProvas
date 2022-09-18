import * as teachersRepository from "../repositories/teachersRepository";

export async function gettingTeacherByName(name:string){
    return await teachersRepository.gettingTeacherByName(name);
}