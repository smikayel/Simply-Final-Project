export const notFoundErrorCreator = () => {
  const error = new Error()
  error.message = "Not found"
  error.status = 404

  return error
}

export const internalServerErrorCreator = () => {
  const error = new Error()
  error.message = 'Internal server error'
  error.status = 500

  return error
}

export const badRequestErrorCreator = (message) => {
  const error = new Error()
  error.status = 400
  error.message = message

  return error
}

export const unauthorizedErrorCreator = (message) => {
  const error = new Error()
  error.message = message
  error.status = 401

  return error
}