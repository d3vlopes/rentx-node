import { ICreateCarDTO } from '../../dtos/ICreteCarDTO'
import { Car } from '../../infra/typeorm/entities/Car'
import { ICarsRepository } from '../ICarsRepository'

export class CarsRepositoryMock implements ICarsRepository {
  cars: Car[] = []

  async create({
    name,
    category_id,
    daily_rate,
    description,
    brand,
    fine_amount,
    license_plate,
  }: ICreateCarDTO) {
    const car = new Car()

    Object.assign(car, {
      name,
      category_id,
      daily_rate,
      description,
      brand,
      fine_amount,
      license_plate,
    })

    this.cars.push(car)

    return car
  }

  async findByLicensePlate(license_plate: string) {
    return this.cars.find((car) => car.license_plate === license_plate)
  }
}
