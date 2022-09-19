import * as termsRepository from "../repositories/termsRepository";

export async function gettingTermById(id:number){
    return await termsRepository.gettingTermById(id);
}

export async function gettingTestsGroupByDisciplines(){
    return await termsRepository.gettingAllTheTestsByDisciplineAndTerms();
}