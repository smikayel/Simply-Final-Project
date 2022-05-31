import { prisma } from '../../services/Prisma.js'

const { user } = prisma

export const getAllUsersDB = async () => {
    try {
        const users = await user.findMany()
        return {
            data: users,
            error: null
        }
    } catch (error) {
        return {
            data: null,
            error: error
        }
    } 
}

export const getUserByIdDb = async (id) => {
    try {
        const userbyId = await user.findUnique({
            where: {
              id,
            },
        });
        return {
            data: userbyId,
            error: null
        }
    } catch (error) {
        return {
            data: null,
            error: error
        }
    }
}


export const createUserDb = async (newUserData) => {
    try {
        const createdUser = await user.create ({
            data: newUserData,
        })
        return {
            data: createdUser,
            error: null
        }
    } catch (error) {
        return {
            data: null,
            error: error
        }
    }   
}

export const deleteUserDb = async (userData) => {
    try {
        const deleteUser = await user.delete({
            where: {
                username: userData.username,
            },
          })
        return {
            data: deleteUser,
            error: null
        }
    } catch (error) {
        return {
            data: null,
            error: error
        }
    }   
}

export const updateUserDb = async (userData) => {
    try {
        const updateUser = await user.update({
            where: {
                username: userData.username,
            },
            data: userData,
          })
        return {
            data: updateUser,
            error: null
        }
    } catch (error) {
        return {
            data: null,
            error: error
        }
    }   
}