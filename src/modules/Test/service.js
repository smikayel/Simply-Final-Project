import { responseDataCreator } from '../../helpers/common.js'
import { badRequestErrorCreator, forbiddenErrorCreator } from '../../helpers/errors.js'
import { createTests, getTest, deleteTest, getAllTests, getAllUserTests } from './db.js'
import { getUserTests, getMarks } from '../Users/db.js'
import { ROLE_ADMIN, ROLE_TEACHER } from '../constants.js'

export const handleGetAllTests = async (req, res) => {
  try {
    const allTests = await getAllTests()
    res.status(200).json(responseDataCreator(allTests))
  } catch (err) {
    return res.status(400).json(badRequestErrorCreator(err.message))
  }
}

export const handleGetMarks = async (req, res) => {
  try {
    const { query } = req
    if (!query.userId) throw 'Query have not userId'
    const resault = await getMarks(+query.userId)
    res.status(200).json(responseDataCreator(resault))
  } catch (err) {
    return res.status(400).json(badRequestErrorCreator(err.message))
  }
}

export const handleGetTest = async (req, res) => {
  try {
    const { id: testId } = req.params
    let completed = false
    if (req.role.name !== ROLE_ADMIN) {
      const tests = await getUserTests(req.email)
      const match = tests.some(({ test, isComplete }) => {
        if (req.role.name !== ROLE_TEACHER) {
          if (+test.id === +testId) {
            completed = isComplete
          }
          return (
            +test.id === +testId &&
            test.start <= new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000)
          )
        }
        return +test.id === +testId
      })
      if (!match) {
        res.status(406).json(forbiddenErrorCreator('You cant access this test'))
        return
      }
    }

    const test = await getTest(+testId, completed)

    res.status(200).json(responseDataCreator(test))
  } catch (err) {
    return res.status(400).json(badRequestErrorCreator(err.message))
  }
}

export const handleCreateTest = async (req, res) => {
  try {
    const createdTest = await createTests(req.body)
    res.status(201).json(responseDataCreator({ createdTest }))
  } catch (err) {
    return res.status(400).json(badRequestErrorCreator(err.message))
  }
}

export const handleDeleteTest = async (req, res) => {
  try {
    const teacher = req.role.name === ROLE_TEACHER

    const deletedTest = await deleteTest(req.body, req.id, teacher)
    res.status(202).json(responseDataCreator(deletedTest))
  } catch (err) {
    return res.status(400).json(badRequestErrorCreator(err.message))
  }
}

export const handleGetAllTestsForUser = async (req, res) => {
  try {
    let { isComplete, take, skip, subjectId } = req.query
    if (take !== undefined) take = +take
    if (skip !== undefined) skip = +skip
    if (subjectId !== undefined) subjectId = +subjectId
    const userId = req.role.name === ROLE_ADMIN ? undefined : req.id
    const userTests = await getAllUserTests(userId, isComplete, take, skip, subjectId)
    res.status(200).json(responseDataCreator(userTests))
  } catch (err) {
    console.log(err)
    return res.status(400).json(badRequestErrorCreator(err.message))
  }
}
