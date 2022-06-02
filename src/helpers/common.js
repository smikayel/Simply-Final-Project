import { badRequestErrorCreator } from './errors.js'



export const responseDataCreator = (data) => ({
  data,
  count: data.length,
})
