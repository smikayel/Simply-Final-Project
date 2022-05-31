export const notFoundErrorCreator = () => {
  const error = new Error('Not Found')
  error.status = 404

  return error
}

export const internalServerErrorCreator = () => {
  const error = new Error('Internal server error')
  error.status = 500

  return error
}

export const badRequestErrorCreator = (details) => {
  const error = new Error('Bad Request')
  error.status = 400
  error.details = details

  return error
}
