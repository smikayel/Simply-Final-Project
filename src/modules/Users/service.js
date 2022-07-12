import { responseDataCreator } from '../../helpers/common.js'
import { badRequestErrorCreator } from '../../helpers/errors.js'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
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
  getTopUsers,
  getUserById,
} from './db.js'
import { FRONT_BASE_URL, PASSWORD_RECOVERY_EXPIRE_TIME } from '../constants.js'
import { validateTestResultReq, validateTestSubmit } from './helpers.js'
import bcrypt from 'bcrypt'
import { send_email } from '../../notification_sender/notification_sender.js'
dotenv.config()

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
    const search = req.query.search
    const users = await getAllUsers(search)
    res.status(200).json(responseDataCreator({ users }))
  } catch (err) {
    return res.status(400).json(badRequestErrorCreator())
  }
}

export const handleGetUserById = async (req, res) => {
  try {
    const id = req.params.id
    const user = await getUserById(id)
    res.status(200).json(responseDataCreator({ user }))
  } catch (err) {
    return res.status(400).json(badRequestErrorCreator())
  }
}

export const handleCreateUsers = async (req, res) => {
  try {
    const users = req.body
    const nonHashedPw = []
    for (const user of users) {
      nonHashedPw.push(user.password)
      user.password = await bcrypt.hash(user.password, 10)
    }

    const createdUser = await createUsers(req.body)
    // users.map((user, i) => {
    //   send_email(user.email, 'Welcome', 'createUser', {
    //     firstName: user.firstName,
    //     lastName: user.lastName,
    //     password: nonHashedPw[i],
    //     email: user.email,
    //   })
    // })
    res.status(201).json(responseDataCreator(createdUser))
  } catch (err) {
    let errorMessage = ''
    if (err.code === 'P2002') errorMessage = 'Email already exists'
    return res.status(400).json(badRequestErrorCreator(errorMessage))
  }
}

export const handleDeleteUsers = async (req, res) => {
  try {
    const deletedUser = await deleteUserByIds(req.body.ids)
    res.status(200).json(responseDataCreator({ deletedUser }))
  } catch (err) {
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
    throw ''
  } catch (err) {
    return res.status(400).json(badRequestErrorCreator('Incorrect password.'))
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
      .status(201)
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
    const {
      mark,
      answerResult: questions,
      questionMarks,
    } = await getUserTestResults(userId, testId)

    res.status(200).json(responseDataCreator({ mark, questions, questionMarks }))
  } catch (err) {
    return res.status(400).json(badRequestErrorCreator(err.message))
  }
}

export const handleGetTopUsers = async (req, res) => {
  try {
    const topUsers = await getTopUsers()
    res.status(200).json(responseDataCreator(topUsers))
  } catch (err) {
    return res.status(400).json(badRequestErrorCreator(err.message))
  }
}

export const handleForgotPassword = async (req, res) => {
  try {
    const { email } = req.query
    const user = await getUser({ email })
    if (!user) {
      return res.status(400).json(badRequestErrorCreator('User not found'))
    }
    const secret = process.env.FORGOT_PASSWORD_SECRET + user.password // to make sure that token is valid only one time unless user sets the same password
    const payload = { email, userId: user.id }
    const token = jwt.sign(payload, secret, { expiresIn: PASSWORD_RECOVERY_EXPIRE_TIME })
    const link = FRONT_BASE_URL + `/reset-password/${user.id}/${token}`
    send_email(user.email, 'Password Recovery', 'resetPassword', { link })
    res.status(200).json(responseDataCreator(token))
  } catch (err) {
    return res.status(400).json(badRequestErrorCreator(err))
  }
}

export const handleResetPassword = async (req, res) => {
  try {
    const { password } = req.body
    const { userId, token } = req.params
    const user = await getUser({ id: +userId })
    if (!user) {
      return res.status(400).json(badRequestErrorCreator('User not found'))
    }

    const { refreshToken: rT, password: pw, ...sendUserDataFront } = user // eslint-disable-line no-unused-vars

    const secret = process.env.FORGOT_PASSWORD_SECRET + user.password
    jwt.verify(token, secret, async (err, decoded) => {
      if (err || user.email !== decoded.email)
        return res.status(400).json(badRequestErrorCreator('Link is not valid!'))
      const pwHashed = await bcrypt.hash(password, 10)
      const updatedUser = await updateUserbyId(+userId, { password: pwHashed })
      res.status(200).json(
        responseDataCreator({
          sendUserDataFront,
        })
      )
    })
  } catch (err) {
    return res.status(400).json(badRequestErrorCreator('Link is not valid'))
  }
}
