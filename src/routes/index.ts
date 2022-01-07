import { Router } from 'express'

import { categoriesRoutes } from './categories.routes'
import { specificationRoutes } from './specification.routes'
import { usersRoutes } from './users.routes'

export const router = Router()

router.use('/categories', categoriesRoutes)
router.use('/specifications', specificationRoutes)
router.use('/users', usersRoutes)
