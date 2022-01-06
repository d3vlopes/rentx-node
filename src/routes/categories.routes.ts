import { Request, Response, Router } from 'express'
import multer from 'multer'

import createCategoryController from '../modules/cars/useCases/createCategory'
import { listCategoriesController } from '../modules/cars/useCases/listCategories'
import { importCategoryController } from '../modules/cars/useCases/importCategory'

export const categoriesRoutes = Router()

const upload = multer({
  dest: './tmp',
})

categoriesRoutes.post('/', (req: Request, res: Response) => {
  return createCategoryController().handle(req, res)
})

categoriesRoutes.get('/', (req: Request, res: Response) => {
  return listCategoriesController.handle(req, res)
})

categoriesRoutes.post(
  '/import',
  upload.single('file'),
  (req: Request, res: Response) => {
    importCategoryController.handle(req, res)
  },
)
