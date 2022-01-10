import { Category } from '../../entities/Category'
import {
  ICategoriesRepository,
  ICreateCategoryDTO,
} from '../ICategoriesRepository'

export class CategoriesRepositoryMock implements ICategoriesRepository {
  categories: Category[] = []

  async findByName(name: string) {
    const category = this.categories.find((category) => category.name === name)
    return category
  }

  async list() {
    const all = this.categories
    return all
  }

  async create({ name, description }: ICreateCategoryDTO) {
    const category = new Category()

    Object.assign(category, {
      name,
      description,
    })

    this.categories.push(category)
  }
}
