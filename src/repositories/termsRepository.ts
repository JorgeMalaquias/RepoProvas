import prisma from "../database/database";

export async function gettingTermById(id:number){
    const term = await prisma.terms.findFirst({
        where:{
            id
        }
    });
    return term;
}

export async function gettingAllTheTestsByDisciplineAndTerms(){
    const tests = await prisma.terms.findMany({
        select:{
            number:true,
            disciplines:{
                select:{
                    name:true,
                    teachersDisciplines:{
                        select:{
                            teacher:{select:{name:true}},
                            tests:{
                                orderBy:{
                                    categoryId: 'asc'
                                },
                                select:{
                                    name:true,
                                    pdfUrl:true,
                                    category:{
                                        select:{name:true}
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    });
    return tests;
}

