import { responseDataCreator } from '../../helpers/common.js'
import { badRequestErrorCreator } from '../../helpers/errors.js'
import {
  getScheduleByGroupId,
  getScheduleById,
  deleteSchedule,
  updateSchedule,
  createSchedules,
} from './db.js'

export const handleGetScheduleById = async (req, res) => {
  try {
    const { id } = req.params
    const schedule = await getScheduleById(+id)
    res.status(200).json(responseDataCreator(schedule))
  } catch (err) {
    res.status(400).json(badRequestErrorCreator(err))
  }
}

export const handleGetScheduleByGroup = async (req, res) => {
  try {
    const { groupId } = req.params
    let { day } = req.query
    day = +day || day
    const schedules = await getScheduleByGroupId(+groupId, day)
    res.status(200).json(responseDataCreator(schedules))
  } catch (err) {
    return res.status(400).json(badRequestErrorCreator(err.message))
  }
}

export const handleCreateSchedule = async (req, res) => {
  try {
    const body = req.body
    const data = body.schedule.map((elem) => {
      elem.groupId = body.groupId
      return elem
    })
    const schedules = await createSchedules(data)
    res.status(201).json(responseDataCreator(schedules))
  } catch (err) {
    return res.status(400).json(badRequestErrorCreator(err.message))
  }
}

export const handleDeleteSchedule = async (req, res) => {
  try {
    const { id } = req.params
    const schedules = await deleteSchedule(+id)
    res.status(200).json(responseDataCreator(schedules))
  } catch (err) {
    return res.status(400).json(badRequestErrorCreator(err.message))
  }
}

export const handleUpdateSchedule = async (req, res) => {
  try {
    const body = req.body
    const schedules = await updateSchedule(body)
    res.status(200).json(responseDataCreator(schedules))
  } catch (err) {
    return res.status(400).json(badRequestErrorCreator(err.message))
  }
}
