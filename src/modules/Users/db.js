import { prisma } from '../../services/Prisma.js'

const { user } = prisma

export const getAllUsers = async () => {
    try{
        const users = await user.findMany();
        return users
    } catch (error) {
        return error
    }
}

export const getUser = async (data) => {
    
    try{
        const foundUser = await user.findUnique({
            where: data,
            include: {
                role: true
            }
        });
        return foundUser
    } catch (error) {
        return error
    }
}

export const updateUserbyId = async (id, data) => {
    try{
        const updatedUser = await user.update({
            where:{
                id,
            },
            data,
        });
        return updatedUser
    } catch (error) {
        return error
    }
}

export const deleteUserById = async (id) => {
    try{
        const deletedUser = await user.delete({
            where: {
                id,
            }
        });
        return deletedUser
    } catch (error){
        return error;
    }
}


export const createUser = async (data) => {
    try{
        const createdUser = await user.create({
            data,
        });
        return createdUser
    } catch (error) {
        return error
    }
}