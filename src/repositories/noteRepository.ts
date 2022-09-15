import { prisma } from "../database/database";
import { INoteBody } from "../types/noteTypes";


//creating
export async function gettingNoteByName(title:string,userId:number){
    const note = await prisma.notes.findFirst({
        where:{
            title,
            userId
        }
    });
    return note;
}

export async function storing({title,text,userId}:INoteBody){
    await prisma.notes.create({
        data: {
            title,
            text,
            userId
        }
    });
}

//gettingOne

export async function gettingOneNote(id:number,userId:number){
    const note = await prisma.notes.findFirst({
        where:{
            id,
            userId
        }
    });
    return note;
}

//gettingAll

export async function gettingAll(userId:number){
    const notes = await prisma.notes.findMany({
        where:{
            userId
        }
    });
    return notes;
}

//gettingOne

export async function deleteNote(id:number){
    await prisma.notes.delete({
        where:{
            id
        }
    });
}