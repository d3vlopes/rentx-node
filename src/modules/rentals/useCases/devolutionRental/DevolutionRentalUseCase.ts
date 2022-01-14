import { inject, injectable } from 'tsyringe'
import { AppError } from '../../../../shared/errors/AppError'
import { IDateProvider } from '../../../../shared/container/providers/DateProvider/IDateProvider'
import { ICarsRepository } from '../../../cars/repositories/ICarsRepository'
import { IRentalsRepository } from '../../repositories/IRentalsRepository'

interface IRequest {
  id: string
  user_id: string
}

@injectable()
export class DevolutionRentalUseCase {
  constructor(
    @inject('RentalsRepository')
    private rentalsRepository: IRentalsRepository,
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,
    @inject('DayjsDateProvider')
    private dateProvider: IDateProvider,
  ) {}

  async execute({ id, user_id }: IRequest) {
    const rental = await this.rentalsRepository.findById(id)
    const car = await this.carsRepository.findById(rental.car_id)

    const min_daily = 1

    if (!rental) {
      throw new AppError('Rental does not exists!')
    }

    const dateNow = this.dateProvider.dateNow()

    let daily = this.dateProvider.compareInDays(
      rental.start_date,
      this.dateProvider.dateNow(),
    )

    if (daily <= 0) {
      daily = min_daily
    }

    const delay = this.dateProvider.compareInDays(
      dateNow,
      rental.expected_return_date,
    )

    let total = 0

    if (delay > 0) {
      const calculate_fine = delay * car.fine_amount
      total = calculate_fine
    }

    total += daily * car.daily_rate

    rental.end_date = this.dateProvider.dateNow()
    rental.total = total

    await this.rentalsRepository.create(rental)
    await this.carsRepository.updateAvailable(car.id, true)

    return rental
  }
}
