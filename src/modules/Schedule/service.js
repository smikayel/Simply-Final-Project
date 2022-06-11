import { getScheduleByGroupId } from './db.js'
import { responseDataCreator } from '../../helpers/common.js'
import { badRequestErrorCreator } from '../../helpers/errors.js'
import { createSchedule, deleteSchedule } from './db.js'

export const handleGetSchedule = async (req, res) => {
  try {
    const { groupId } = req.params
    let { day } = req.query
    day = +day || day
    const schedules = await getScheduleByGroupId(+groupId, day)
    res.json(responseDataCreator(schedules))
  } catch (err) {
    return res.json(badRequestErrorCreator(err.message))
  }
}

export const handleCreateSchedule = async (req, res) => {
  try {
    const body = req.body
    const schedules = await createSchedule(body)
    res.json(responseDataCreator(schedules))
  } catch (err) {
    return res.json(badRequestErrorCreator(err.message))
  }
}

export const handleDeleteSchedule = async (req, res) => {
  try {
    const { id } = req.params
    const schedules = await deleteSchedule(+id)
    res.json(responseDataCreator(schedules))
  } catch (err) {
    return res.json(badRequestErrorCreator(err.message))
  }
}
