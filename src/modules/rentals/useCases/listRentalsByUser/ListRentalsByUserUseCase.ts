import { inject, injectable } from 'tsyringe'
import { IRentalsRepository } from '../../repositories/IRentalsRepository'

interface IRequest {}

@injectable()
export class ListRentalsByUserUseCase {
  constructor(
    @inject('RentalsRepository')
    private rentalsRepository: IRentalsRepository,
  ) {}

  async execute(user_id: string) {
    const rentalsByUser = await this.rentalsRepository.findByUser(user_id)

    return rentalsByUser
  }
}
