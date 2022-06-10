// import { responseDataCreator } from '../../helpers/common.js'
// import { badRequestErrorCreator, unauthorizedErrorCreator } from "../../helpers/errors.js";
// import { getTest } from "./db.js";
// import { getUserTests } from "../Users/db.js";
// import bcrypt from 'bcrypt'
import { getScheduleByGroupId } from './db.js'
import { responseDataCreator } from '../../helpers/common.js'
import { badRequestErrorCreator } from '../../helpers/errors.js'
import { createSchedule } from './db.js'

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
