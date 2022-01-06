import { CategoriesRepository } from '../../repositories/implementatios/CategoriesRepository'
import { CreateCategoryController } from './createCategoryController'
import { CreateCategoryUseCase } from './CreateCategoryUseCase'

export default () => {
  const categoriesRepository = new CategoriesRepository()
  const createCategoryUseCase = new CreateCategoryUseCase(categoriesRepository)
  const createCategoryController = new CreateCategoryController(
    createCategoryUseCase,
  )

  return createCategoryController
}
