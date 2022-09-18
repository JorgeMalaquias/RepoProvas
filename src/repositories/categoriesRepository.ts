import prisma from "../database/database";
import { Categories } from "@prisma/client";


export async function gettingCategoryByName(name:string){
    const category = await prisma.categories.findUnique({
        where:{
            name
        }
    });
    return category;
}