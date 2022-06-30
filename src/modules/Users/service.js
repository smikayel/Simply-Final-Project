import { responseDataCreator } from '../../helpers/common.js'
import { badRequestErrorCreator, unauthorizedErrorCreator } from '../../helpers/errors.js'
import {
  getAllUsers,
  createUsers,
  updateUserbyId,
  getUser,
  addMark,
  updateUserTest,
  submitTest,
  getUserTestResults,
  deleteUserByIds,
} from './db.js'
import { validateTestResultReq, validateTestSubmit } from './helpers.js'
import bcrypt from 'bcrypt'
import { send_email } from '../../notification_sender/notification_sender.js'

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
    const users = req.body
    for (const user of users) {
      user.password = await bcrypt.hash(user.password, 10)
    }
    const createdUser = await createUsers(req.body)
    users.map((user) => {
      send_email(user.email)
    })
    res.status(200).json(responseDataCreator({ createdUser }))
  } catch (err) {
    return res.status(400).json(badRequestErrorCreator())
  }
}

export const handleDeleteUsers = async (req, res) => {
  try {
    const deletedUser = await deleteUserByIds(req.body.ids)
    console.log(deletedUser)
    res.status(200).json(responseDataCreator({ deletedUser }))
  } catch (err) {
    console.log(err)
    return res.status(400).json(badRequestErrorCreator(err.message))
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
      return res.status(200).json(responseDataCreator({ updatedUser }))
    }
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
    const testId = +req.params.testId
    if (req.role.name === 'Student') await validateTestSubmit(req.id, req.body.testId)
    const { mark, correctAnswerIds, wrongAnswerIds, questionMarks } = await submitTest(
      req.body,
      req.id
    )
    res
      .status(200)
      .json(responseDataCreator({ mark, correctAnswerIds, wrongAnswerIds, questionMarks }))
  } catch (err) {
    return res.status(400).json(badRequestErrorCreator(err.message))
  }
}

export const handleGetUserTestResults = async (req, res) => {
  try {
    const testId = +req.params.testId
    const userId = +req.params.userId
    if (req.role.name === 'Student' && req.id !== userId)
      await validateTestResultReq(userId, testId)

    // const { mark, correctAnswerIds, wrongAnswerIds, questionMarks } = await getUserTestResults(
    //   userId,
    //   testId
    // )
    const {
      mark,
      answerResult: questions,
      questionMarks,
    } = await getUserTestResults(userId, testId)
    // res
    //   .status(200)
    //   .json(responseDataCreator({ mark, correctAnswerIds, wrongAnswerIds, questionMarks }))
    res.status(200).json(responseDataCreator({ mark, questions, questionMarks }))
  } catch (err) {
    return res.status(400).json(badRequestErrorCreator(err.message))
  }
}
