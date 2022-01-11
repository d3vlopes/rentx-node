import { getRepository, Repository } from 'typeorm'

import {
  ICategoriesRepository,
  ICreateCategoryDTO,
} from '../../../repositories/ICategoriesRepository'
import { Category } from '../entities/Category'

export class CategoriesRepository implements ICategoriesRepository {
  private repository: Repository<Category>

  constructor() {
    this.repository = getRepository(Category)
  }

  async create({ name, description }: ICreateCategoryDTO) {
    const category = this.repository.create({
      description,
      name,
    })

    await this.repository.save(category)
  }

  async list() {
    const categories = await this.repository.find()

    return categories
  }

  async findByName(name: string) {
    const category = await this.repository.findOne({ name })

    return category
  }
}
