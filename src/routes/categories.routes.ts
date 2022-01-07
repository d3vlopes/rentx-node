import { Request, Response, Router } from 'express'
import multer from 'multer'

import { CreateCategoryController } from '../modules/cars/useCases/createCategory/createCategoryController'
import { listCategoriesController } from '../modules/cars/useCases/listCategories'
import { ImportCategoryController } from '../modules/cars/useCases/importCategory/ImportCategoryController'

export const categoriesRoutes = Router()

const upload = multer({
  dest: './tmp',
})

const createCategoryController = new CreateCategoryController()
const importCategoryController = new ImportCategoryController()

categoriesRoutes.post('/', createCategoryController.handle)

categoriesRoutes.get('/', (req: Request, res: Response) => {
  return listCategoriesController.handle(req, res)
})

categoriesRoutes.post(
  '/import',
  upload.single('file'),
  importCategoryController.handle,
)
