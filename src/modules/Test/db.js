import { prisma } from '../../services/Prisma.js'

const { test } = prisma

export const getTest = async (id) => {
    try{
        const foundedTest = await test.findUnique({
            where: {id},
            include: {
                userTest: {
                    select: {
                        user: {
                            select: {
                                id: true,
                                firstName: true,
                                lastName: true,
                                email: true,
                            }
                        }
                    }
                } ,
                subject: true,
                questions: {
                    include: {
                        answers: true,
                    }
                }
            }
        });
        return foundedTest;
    } catch (error) {
        throw error;
    }
}
