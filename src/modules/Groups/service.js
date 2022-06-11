// import { badRequestErrorCreator, unauthorizedErrorCreator } from '../../helpers/errors.js';
import { createGroup, getAllGroups, getGroupById, deleteGroupById } from '../Groups/db.js'
import { responseDataCreator } from '../../helpers/common.js'
import dotenv from 'dotenv'
import { badRequestErrorCreator } from '../../helpers/errors.js'
dotenv.config()

export const handleCreateGroup = async (req, res) => {
  try {
    const createdGroup = await createGroup(req.body)
    res.json(responseDataCreator({ createdGroup }))
  } catch (err) {
    return res.json(badRequestErrorCreator())
  }
}

export const handleGetAllGroups = async (req, res) => {
  try {
    const groups = await getAllGroups()
    res.json(responseDataCreator({ groups }))
  } catch (err) {
    return res.json(badRequestErrorCreator())
  }
}

export const handleGetGroupById = async (req, res) => {
  try {
    const group = await getGroupById(parseInt(req.params.id))
    res.json(responseDataCreator({ group }))
  } catch (err) {
    return res.json(badRequestErrorCreator())
  }
}

export const handleDeleteGroupById = async (req, res) => {
  try {
    const deletedGroup = await deleteGroupById(parseInt(req.body.id))
    res.json(responseDataCreator({ deletedGroup }))
  } catch (err) {
    return res.json(badRequestErrorCreator())
  }
}
