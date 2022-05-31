import { getAllUsersDB, getUserByIdDb, createUserDb, deleteUserDb, updateUserDb } from "./db.js"
import { responseDataCreator } from '../../helpers/common.js'
import bcrypt from 'bcrypt'

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await getAllUsersDB()
    res.json(responseDataCreator(users))
  } catch (error) {
    next(error)
  }
}

export const getUser = async (req, res, next) => {
    try {
        const User = await getUserByIdDb(req.params.UserId)
        res.send(User);
    } catch (error) {
        next(error)
    }
}

export const createUser = async (req, res, next) => {
  try {
    bcrypt.hash(req.body.password, 5, async function (err, hash) {
      req.body.password = hash
      const user = await createUserDb(req.body)
      res.send(user)
    });
  } catch (error) {
    next(error)
  }
}

export const deleteUser = async (req, res, next) => {
  try {
    const deletedUser = await deleteUserDb(req.body)
    res.send(deletedUser)
  } catch (error) {
    next(error)
  }
}

export const updateUser = async (req, res, next) => {
  try {
    const updateUser = await updateUserDb(req.body)
    res.send(updateUser)
  } catch (error) {
    next(error)
  }
}