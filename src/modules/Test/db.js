import { prisma } from '../../services/Prisma.js'
import includes from './includes.js';

const { test } = prisma

export const getAllTests = async () => {
    try{
        const allTests = await test.findMany({
            include: includes,
        });
        return allTests;
    } catch (error) {
        throw error;
    }
}

export const getTest = async (id) => {
    try{
        const foundedTest = await test.findUnique({
            where: {id},
            include: includes,
        });
        return foundedTest;
    } catch (error) {
        throw error;
    }
}
