import { responseDataCreator } from '../../helpers/common.js'
import { getAllCompaniesDB } from './db.js'

export const getAllCompanies = async (req, res, next) => {
  try {
    const companies = await getAllCompaniesDB()
    res.json(responseDataCreator(companies))
  } catch (error) {
    next(error)
  }
}

export const getCompanyById = async (req, res) => {
  res.send('comp')
}
