import { AppError } from '../../../../shared/errors/AppError'
import { CategoriesRepositoryMock } from '../../repositories/mocks/CategoriesRepositoryMock'
import { CreateCategoryUseCase } from './CreateCategoryUseCase'

let createCategoryUseCase: CreateCategoryUseCase
let categoriesRepositoryMock: CategoriesRepositoryMock

describe('Create Category', () => {
  beforeEach(() => {
    categoriesRepositoryMock = new CategoriesRepositoryMock()
    createCategoryUseCase = new CreateCategoryUseCase(categoriesRepositoryMock)
  })

  it('should be able to create a new category', async () => {
    const category = {
      name: 'Category Test',
      description: 'Category description Test',
    }

    await createCategoryUseCase.execute({
      name: category.name,
      description: category.description,
    })

    const categoryCreated = await categoriesRepositoryMock.findByName(
      category.name,
    )

    expect(categoryCreated).toHaveProperty('id')
  })

  it('should not be able to create a new category with name exists', async () => {
    const category = {
      name: 'Category Test',
      description: 'Category description Test',
    }

    await createCategoryUseCase.execute({
      name: category.name,
      description: category.description,
    })

    await expect(
      createCategoryUseCase.execute({
        name: category.name,
        description: category.description,
      }),
    ).rejects.toEqual(new AppError('Category already exists!'))
  })
})
