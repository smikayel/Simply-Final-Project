// import { badRequestErrorCreator, unauthorizedErrorCreator } from '../../helpers/errors.js';
import {
  createGroup,
  getAllGroups,
  getGroupById,
  deleteGroupById,
  createGroupWithUsers,
} from '../Groups/db.js'
import { responseDataCreator } from '../../helpers/common.js'
import dotenv from 'dotenv'
import { badRequestErrorCreator } from '../../helpers/errors.js'
dotenv.config()

export const handleCreateGroup = async (req, res) => {
  try {
    const createdGroup = await createGroup(req.body)
    res.status(200).json(responseDataCreator({ createdGroup }))
  } catch (err) {
    return res.status(400).json(badRequestErrorCreator())
  }
}

export const handleGetAllGroups = async (req, res) => {
  try {
    const groups = await getAllGroups()
    res.status(200).json(responseDataCreator({ groups }))
  } catch (err) {
    return res.status(400).json(badRequestErrorCreator())
  }
}

export const handleGetGroupById = async (req, res) => {
  try {
    const group = await getGroupById(parseInt(req.params.id))
    res.status(200).json(responseDataCreator({ group }))
  } catch (err) {
    return res.status(400).json(badRequestErrorCreator())
  }
}

export const handleDeleteGroupById = async (req, res) => {
  try {
    const deletedGroup = await deleteGroupById(parseInt(req.body.id))
    res.status(200).json(responseDataCreator({ deletedGroup }))
  } catch (err) {
    return res.status(400).json(badRequestErrorCreator())
  }
}

export const handleCreateGroupWithUsers = async (req, res) => {
  try {
    const createdGroupWithUsers = await createGroupWithUsers(req.body)
    res.status(200).json(responseDataCreator({ createdGroupWithUsers }))
  } catch (err) {
    return res.status(400).json(badRequestErrorCreator())
  }
}
