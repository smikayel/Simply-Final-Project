import { responseDataCreator } from '../../helpers/common.js'
import { badRequestErrorCreator, unauthorizedErrorCreator } from '../../helpers/errors.js'
import {
  getAllUsers,
  createUsers,
  deleteUserById,
  updateUserbyId,
  getUser,
  addMark,
  updateUserTest,
  calculateUserTestMark,
} from './db.js'
import bcrypt from 'bcrypt'

export const handleGetUser = async (req, res) => {
  try {
    const { id, testId } = req.params
    const user = await getUser(+id, +testId)
    return user
  } catch (err) {
    return res.status(400).json(badRequestErrorCreator(err.message))
  }
}

export const handleGetAllUsers = async (req, res) => {
  try {
    const users = await getAllUsers()
    res.status(200).json(responseDataCreator({ users }))
  } catch (err) {
    return res.status(400).json(badRequestErrorCreator())
  }
}

export const handleCreateUsers = async (req, res) => {
  try {
    for (const user of req.body) {
      user.password = await bcrypt.hash(user.password, 10)
    }
    const createdUser = await createUsers(req.body)
    res.status(200).json(responseDataCreator({ createdUser }))
  } catch (err) {
    return res.status(400).json(badRequestErrorCreator())
  }
}

export const handleDeleteUser = async (req, res) => {
  try {
    const deletedUser = await deleteUserById(parseInt(req.body.id))
    res.status(200).json(responseDataCreator({ deletedUser }))
  } catch (err) {
    return res.status(400).json(badRequestErrorCreator())
  }
}

export const handleUpdateUser = async (req, res) => {
  try {
    const { id, password, newPassword } = req.body
    const foundUser = await getUser({ id: +id })
    const match = await bcrypt.compare(password, foundUser.password)
    if (match) {
      const pwHashed = await bcrypt.hash(newPassword, 10)
      /* eslint-disable no-unused-vars */
      const { refreshToken, password, ...updatedUser } = await updateUserbyId(+id, {
        password: pwHashed,
      })
      /* eslint-disable no-unused-vars */
      res.status(200).json(responseDataCreator({ updatedUser }))
      return
    }
    throw new Error('Password is incorrect')
  } catch (err) {
    return res.status(401).json(unauthorizedErrorCreator(err.message))
  }
}

export const handleSetUserMark = async (req, res) => {
  try {
    if (req.role.name !== 'Teacher') {
      return res.status(400).json(badRequestErrorCreator('You are not authorized to do this'))
    }
    const studentMark = await addMark(req.email, req.body)
    res.status(200).json(responseDataCreator({ studentMark }))
  } catch (err) {
    return res.status(400).json(badRequestErrorCreator(err.message))
  }
}

export const handleUpdateUserTest = async (req, res) => {
  try {
    const userTest = await updateUserTest(req.id, req.body)
    res.status(200).json(responseDataCreator(userTest))
  } catch (err) {
    return res.status(400).json(badRequestErrorCreator())
  }
}

export const handleUserTestSubmit = async (req, res) => {
  try {
    const mark = await calculateUserTestMark(req.body)
    const testId = +req.params.testId
    await addMark('dummy', { studentId: req.id, testId, mark }, true)
    res.status(200).json(responseDataCreator({ mark }))
  } catch (err) {
    console.log(err)
    return res.status(400).json(badRequestErrorCreator(err.message))
  }
}
