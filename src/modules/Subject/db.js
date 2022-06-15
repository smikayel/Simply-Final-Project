import { prisma } from '../../services/Prisma.js'

const { subject } = prisma

export const getSubjects = async () => {
  try {
    const subjects = await subject.findMany()
    return subjects
  } catch (err) {
    throw err.message
  }
}
export const createSubjects = async (data) => {
  try {
    const createdSubject = await subject.create({
      data,
    })
    return createdSubject
  } catch (err) {
    throw err.message
  }
}
