import * as disciplinesRepository from "../repositories/disciplinesRepository";

export async function gettingDisciplineByName(name:string){
    return await disciplinesRepository.gettingDisciplineByName(name);
}