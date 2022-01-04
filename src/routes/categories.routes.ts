import { Request, Response, Router } from 'express'

import { CategoriesRepository } from '../modules/cars/repositories/CategoriesRepository'
import { createCategoryController } from '../modules/cars/useCases/createCategory'

export const categoriesRoutes = Router()

const categoriesRepository = new CategoriesRepository()

categoriesRoutes.post('/', (req: Request, res: Response) => {
  return createCategoryController.handle(req, res)
})

categoriesRoutes.get('/', (req: Request, res: Response) => {
  const all = categoriesRepository.list()

  return res.json(all)
})
