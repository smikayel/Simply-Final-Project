import { prisma } from '../../services/Prisma.js'

const { group } = prisma

export const createGroup = async (data) => {
    try{
        const createdGroup = await group.create({
            data,
        });
        return createdGroup
    } catch (error) {
        return error
    }
}
