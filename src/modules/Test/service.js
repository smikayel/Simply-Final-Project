import { responseDataCreator } from '../../helpers/common.js'
import { badRequestErrorCreator, unauthorizedErrorCreator } from '../../helpers/errors.js'
import { createTests, getTest } from './db.js'
import { getUserTests } from '../Users/db.js'

export const handleGetTest = async (req, res) => {
  try {
    const { id: testId } = req.params
    if (req.role !== 'Admin') {
      const { id: userId } = req.body

      const tests = await getUserTests(userId)
      const match = tests.some(({ test }) => {
        if (req.role !== 'Teacher') {
          const tmp = new Date()
          const endDate = new Date()
          endDate.setTime(test.start.getTime() + test.length * 60 * 1000)
          return +test.id === +testId && test.start <= tmp && endDate > tmp
        }
        return +test.id === +testId
      })
      if (!match) {
        res.json(unauthorizedErrorCreator('You cant access this test'))
        return
      }
    }

    const test = await getTest(+testId)

    res.json(responseDataCreator(test))
  } catch (err) {
    console.log(err)
    return res.json(badRequestErrorCreator(err.message))
  }
}

export const handleCreateTest = async (req, res) => {
  try {
    const createdTest = await createTests(req.body)
    res.json(responseDataCreator(createdTest))
  } catch (err) {
    return res.json(badRequestErrorCreator(err.message))
  }
}

// export const handleDeleteTest = async (req, res) => {
//   try {
//     const deletedTest = await deleteTest(req.body);
//     res.json(responseDataCreator(deletedTest));
//   } catch (err) {
//     return res.json(badRequestErrorCreator(err.message))
//   }
// }
