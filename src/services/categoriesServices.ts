import * as categoriesRepository from "../repositories/categoriesRepository";

export async function gettingCategoryByName(name:string){
    return await categoriesRepository.gettingCategoryByName(name);
}