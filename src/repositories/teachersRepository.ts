import prisma from "../database/database";


export async function gettingTeacherByName(name: string) {
    const teacher = await prisma.teachers.findUnique({
        where: {
            name
        }
    });
    return teacher;
}

export async function gettingAllTheTestsByTeacher() {
    const tests = await prisma.teachers.findMany({
        select: {
            name: true,
            teachersDisciplines: {
                select: {
                    discipline: { select: { name: true } },
                    tests: {
                        orderBy: {
                            categoryId: 'asc'
                        },
                        select: {
                            name: true,
                            pdfUrl: true,
                            category: {
                                select: { name: true }
                            }
                        }
                    }
                }
            }

        }
    });
    return tests;
}