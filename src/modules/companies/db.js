import { prisma } from '../../services/Prisma.js'

const { company } = prisma

export const getAllCompaniesDB = async () => {
  try {
    const companies = await company.findMany()
    return {
      data: companies,
      error: null,
    }
  } catch (error) {
    return {
      data: null,
      error: error,
    }
  }
}

export const getCompanyByIdDB = async () => {
  // res.send('comp')
}
