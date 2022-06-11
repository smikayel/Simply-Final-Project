import { responseDataCreator } from '../../helpers/common.js'
import { badRequestErrorCreator, unauthorizedErrorCreator } from '../../helpers/errors.js'
import { getAllUsers, createUser, deleteUserById, updateUserbyId, getUser, addMark } from './db.js'
import bcrypt from 'bcrypt'

export const handleGetUser = async (req, res) => {
  try {
    const { id, testId } = req.params
    const user = await getUser(+id, +testId)
  } catch (err) {
    return res.json(badRequestErrorCreator(err.message))
  }
}

export const handleGetAllUsers = async (req, res) => {
  try {
    const users = await getAllUsers()
    res.json(responseDataCreator({ users }))
  } catch (err) {
    return res.json(badRequestErrorCreator())
  }
}

export const handleCreateUser = async (req, res) => {
  try {
    bcrypt.hash(req.body.password, 5, async function (err, hash) {
      req.body.password = hash
      req.body.roleId = parseInt(req.body.roleId)
      const createdUser = await createUser(req.body)
      res.json(responseDataCreator({ createdUser }))
    })
  } catch (err) {
    return res.json(badRequestErrorCreator())
  }
}

export const handleDeleteUser = async (req, res) => {
  try {
    const deletedUser = await deleteUserById(parseInt(req.body.id))
    res.json(responseDataCreator({ deletedUser }))
  } catch (err) {
    return res.json(badRequestErrorCreator())
  }
}

export const handleUpdateUser = async (req, res) => {
  try {
    const { id, password, newPassword } = req.body
    const foundUser = await getUser({ id: +id })
    const match = await bcrypt.compare(password, foundUser.password)
    if (match) {
      const pwHashed = await bcrypt.hash(newPassword, 10)

      const { refreshToken, password, ...updatedUser } = await updateUserbyId(+id, {
        password: pwHashed,
      })
      res.json(responseDataCreator({ updatedUser }))
      return
    }
    throw new Error('Password is incorrect')
  } catch (err) {
    return res.json(unauthorizedErrorCreator(err.message))
  }
}

export const handleSetUserMark = async (req, res) => {
  try {
    if (req.role.name !== 'Teacher') {
      return res.json(badRequestErrorCreator('You are not authorized to do this'))
    }
    const studentMark = await addMark(req.email, req.body)
    res.json(responseDataCreator({ studentMark }))
  } catch (err) {
    return res.json(badRequestErrorCreator(err.message))
  }
}
