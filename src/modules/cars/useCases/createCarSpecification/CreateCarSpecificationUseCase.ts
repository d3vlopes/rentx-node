import { inject, injectable } from 'tsyringe'
import { AppError } from '../../../../shared/errors/AppError'
import { ICarsRepository } from '../../repositories/ICarsRepository'
import { ISpecificationsRepository } from '../../repositories/ISpecificationsRepository'

interface IRequest {
  car_id: string
  specifications_id: string[]
}

@injectable()
export class CreateCarSpecificationUseCase {
  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,
    @inject('SpecificationsRepository')
    private specificationsRepository: ISpecificationsRepository,
  ) {}

  async execute({ car_id, specifications_id }: IRequest) {
    const carExist = await this.carsRepository.findById(car_id)

    if (!carExist) {
      throw new AppError('Car does not exists!')
    }

    const specifications = await this.specificationsRepository.findByIds(
      specifications_id,
    )

    carExist.specifications = specifications

    await this.carsRepository.create(carExist)

    return carExist
  }
}
