import { getRoles } from './db.js'
import { responseDataCreator } from '../../helpers/common.js'
import dotenv from 'dotenv'
import { badRequestErrorCreator } from '../../helpers/errors.js'
dotenv.config()

export const handleGetAllRoles = async (req, res) => {
  try {
    const roles = await getRoles()
    res.status(200).json(responseDataCreator(roles))
  } catch (err) {
    return res.status(400).json(badRequestErrorCreator())
  }
}
