import swaggerUi from 'swagger-ui-express'
import swaggerJsDoc from 'swagger-jsdoc'
import { Router } from 'express'

const router = Router()

export const swaggerOptions = {
  swaggerDefinition: {
    info: {
      version: '1.0.0',
      title: 'University API',
      description: 'University managment API',
      contact: {
        name: 'Hov, Hayk, Davit, Sasha',
      },
      servers: ['http://localhost:5000'],
    },

    securityDefinitions: {
      bearerAuth: {
        type: 'apiKey',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        in: 'header',
        name: 'authorization',
      },
    },
  },
  // ['.routes/*.js']
  apis: [
    './src/modules/Auth/routes.js',
    './src/modules/Groups/routes.js',
    './src/modules/Schedule/routes.js',
    './src/modules/Subject/routes.js',
    './src/modules/Test/routes.js',
    './src/modules/Users/routes.js',
    './src/modules/Chat/routes.js',
    './src/modules/Role/routes.js',
  ],
}

const swaggerDocs = swaggerJsDoc(swaggerOptions)
router.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

export { router as swaggerRoutes }
