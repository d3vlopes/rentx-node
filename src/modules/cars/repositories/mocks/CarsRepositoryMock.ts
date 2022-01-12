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
    id,
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
      id,
    })

    this.cars.push(car)

    return car
  }

  async findByLicensePlate(license_plate: string) {
    return this.cars.find((car) => car.license_plate === license_plate)
  }

  async findAvailable(brand?: string, category_id?: string, name?: string) {
    const all = this.cars.filter((car) => {
      if (
        car.available === true ||
        (brand && car.brand === brand) ||
        (category_id && car.category_id === category_id) ||
        (name && car.name === name)
      ) {
        return car
      }
      return null
    })

    return all
  }

  async findById(id: string) {
    return this.cars.find((car) => car.id === id)
  }
}
