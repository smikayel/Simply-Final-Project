import { responseDataCreator } from '../../helpers/common.js'
import { badRequestErrorCreator } from '../../helpers/errors.js'
import { getSubjects, createSubjects } from './db.js'

export const handleGetSubjects = async (req, res) => {
  try {
    const allSubjects = await getSubjects()
    res.status(200).json(responseDataCreator(allSubjects))
  } catch (err) {
    return res.status(400).json(badRequestErrorCreator(err.message))
  }
}

export const handleCreateSubjects = async (req, res) => {
  try {
    const createdSubjects = await createSubjects(req.body)
    res.status(200).json(responseDataCreator(createdSubjects))
  } catch (err) {
    return res.status(400).json(badRequestErrorCreator(err.message))
  }
}
