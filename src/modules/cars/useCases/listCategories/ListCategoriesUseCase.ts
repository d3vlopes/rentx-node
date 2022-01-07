import { injectable, inject } from 'tsyringe'
import { ICategoriesRepository } from '../../repositories/ICategoriesRepository'

@injectable()
export class ListCategoriesUseCase {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
  ) {}

  async execute() {
    const categories = await this.categoriesRepository.list()

    return categories
  }
}
