import { getRepository, Repository } from 'typeorm'

import { ICreateRentalDTO } from '../../../dtos/ICreateRentalDTO'
import { IRentalsRepository } from '../../../repositories/IRentalsRepository'
import { Rental } from '../entities/Rental'

export class RentalsRepository implements IRentalsRepository {
  private repository: Repository<Rental>

  constructor() {
    this.repository = getRepository(Rental)
  }

  async findOpenRentalByCar(car_id: string) {
    const openByCar = await this.repository.findOne({
      where: {
        car_id,
        end_date: null,
      },
    })

    return openByCar
  }

  async findOpenRentalByUser(user_id: string) {
    const openByUser = await this.repository.findOne({
      where: { user_id, end_date: null },
    })

    return openByUser
  }

  async create({
    car_id,
    expected_return_date,
    user_id,
    id,
    end_date,
    total,
  }: ICreateRentalDTO) {
    const rental = this.repository.create({
      car_id,
      expected_return_date,
      user_id,
      id,
      end_date,
      total,
    })

    await this.repository.save(rental)

    return rental
  }

  async findById(id: string) {
    const rental = await this.repository.findOne(id)
    return rental
  }
}
