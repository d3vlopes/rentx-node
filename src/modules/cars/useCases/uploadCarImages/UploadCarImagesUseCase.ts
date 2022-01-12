import { inject, injectable } from 'tsyringe'
import { ICarImagesRepository } from '../../repositories/ICarImagesRepository'

interface IRequest {
  car_id: string
  images_name: string[]
}

@injectable()
export class UploadCarImagesUseCase {
  constructor(
    @inject('CarsImagesRepository')
    private carsImagesRepository: ICarImagesRepository,
  ) {}

  async execute({ car_id, images_name }: IRequest) {
    images_name.map(async (image) => {
      await this.carsImagesRepository.create(car_id, image)
    })
  }
}
