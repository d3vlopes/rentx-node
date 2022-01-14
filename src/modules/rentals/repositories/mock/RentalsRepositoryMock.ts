import { ICreateRentalDTO } from '../../dtos/ICreateRentalDTO'
import { Rental } from '../../infra/typeorm/entities/Rental'
import { IRentalsRepository } from '../IRentalsRepository'

export class RentalsRepositoryMock implements IRentalsRepository {
  rentals: Rental[] = []

  async findOpenRentalByCar(car_id: string) {
    return this.rentals.find(
      (rental) => rental.car_id === car_id && !rental.end_date,
    )
  }

  async findOpenRentalByUser(user_id: string) {
    return this.rentals.find(
      (rental) => rental.user_id === user_id && !rental.end_date,
    )
  }

  async create({ car_id, user_id, expected_return_date }: ICreateRentalDTO) {
    const rental = new Rental()

    Object.assign(rental, {
      car_id,
      user_id,
      expected_return_date,
      start_date: new Date(),
    })

    this.rentals.push(rental)

    return rental
  }

  async findById(id: string) {
    return this.rentals.find((rental) => rental.id === id)
  }

  async findByUser(user_id: string) {
    return this.rentals.filter((rental) => rental.user_id === user_id)
  }
}
