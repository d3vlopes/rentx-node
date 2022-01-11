import { inject, injectable } from 'tsyringe'
import { ICarsRepository } from '../../repositories/ICarsRepository'

interface IRequest {
  category_id?: string
  brand?: string
  name?: string
}

@injectable()
export class ListAvailableCarsUseCase {
  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,
  ) {}

  async execute({ brand, category_id, name }: IRequest) {
    const cars = await this.carsRepository.findAvailable(
      brand,
      category_id,
      name,
    )

    return cars
  }
}
