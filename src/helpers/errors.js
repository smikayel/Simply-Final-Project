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

export const badRequestErrorCreator = (message) => {
  const error = new Error(message)
  error.status = 400

  return error
}

export const unauthorizedErrorCreator = (message) => {
  const error = new Error()
  error.message = message
  error.status = 401

  return error
}