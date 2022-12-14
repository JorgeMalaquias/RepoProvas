import prisma from "../database/database";


export async function gettingUserByEmail(email:string){
    const user = await prisma.users.findUnique({
        where:{
            email
        }
    });
    return user;
}
export async function gettingUserById(id:number){
    const user = await prisma.users.findFirst({
        where:{
            id
        }
    });
    return user;
}


export async function registering(email:string,password:string){
    const user = await prisma.users.create({
        data: {
            email,
            password
        }
    });
    return user;
}