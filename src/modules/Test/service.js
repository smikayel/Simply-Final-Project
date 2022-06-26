import { responseDataCreator } from '../../helpers/common.js'
import { badRequestErrorCreator, unauthorizedErrorCreator } from '../../helpers/errors.js'
import { createTests, getTest, deleteTest, getAllTests, getAllUserTests } from './db.js'
import { getUserTests, getMarks } from '../Users/db.js'
import { roleAdminName, roleTeacherName } from '../constants.js'

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
    if (req.url.includes('?')) {
      handleGetMarks(req, res)
      return
    }
    const { id: testId } = req.params
    if (req.role.name !== roleAdminName) {
      const tests = await getUserTests(req.email)
      const match = tests.some(({ test }) => {
        if (req.role.name !== roleTeacherName) {
          const tmp = new Date()
          const endDate = new Date()
          endDate.setTime(test.start.getTime() + test.length * 60 * 1000)
          return +test.id === +testId && test.start <= tmp && endDate > tmp
        }
        return +test.id === +testId
      })
      if (!match) {
        res.status(401).json(unauthorizedErrorCreator('You cant access this test'))
        return
      }
    }

    const test = await getTest(+testId)

    res.status(200).json(responseDataCreator(test))
  } catch (err) {
    return res.status(400).json(badRequestErrorCreator(err.message))
  }
}

export const handleCreateTest = async (req, res) => {
  try {
    const createdTest = await createTests(req.body)
    res.status(200).json(responseDataCreator(createdTest))
  } catch (err) {
    console.log(err)
    return res.status(400).json(badRequestErrorCreator(err.message))
  }
}

export const handleDeleteTest = async (req, res) => {
  try {
    const deletedTest = await deleteTest(req.body)
    res.status(200).json(responseDataCreator(deletedTest))
  } catch (err) {
    console.log(err)
    return res.status(400).json(badRequestErrorCreator(err.message))
  }
}

export const handleGetAllTestsForUser = async (req, res) => {
  try {
    let { isComplete, take, skip, subjectId } = req.query
    if (take !== undefined) take = +take
    if (skip !== undefined) skip = +skip
    if (subjectId !== undefined) subjectId = +subjectId
    const userTests = await getAllUserTests(req.id, isComplete, take, skip, subjectId)
    res.status(200).json(responseDataCreator(userTests))
  } catch (err) {
    console.log(err)
    return res.status(400).json(badRequestErrorCreator(err.message))
  }
}
