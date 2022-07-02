import swaggerUi from 'swagger-ui-express'
import swaggerJsDoc from 'swagger-jsdoc'
import { Router } from 'express'

const router = Router()

export const swaggerOptions = {
  swaggerDefinition: {
    info: {
      version: '1.0.0',
      title: 'Customer API',
      description: 'Customer API Information',
      contact: {
        name: 'Amazing Developer',
      },
      servers: ['http://localhost:5000'],
    },
  },
  // ['.routes/*.js']
  apis: ['./src/modules/Auth/routes.js'],
}

const swaggerDocs = swaggerJsDoc(swaggerOptions)
router.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

export { router as swaggerRoutes }
