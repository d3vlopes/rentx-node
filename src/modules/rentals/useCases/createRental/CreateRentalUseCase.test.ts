import dayjs from 'dayjs'

import { CreateRentalUseCase } from './CreateRentalUseCase'
import { RentalsRepositoryMock } from '../../repositories/mock/RentalsRepositoryMock'
import { AppError } from '../../../../shared/errors/AppError'
import { DayjsDateProvider } from '../../../../shared/container/providers/DateProvider/implementations/DayjsDateProvider'

let createRentalUseCase: CreateRentalUseCase
let rentalsRepositoryMock: RentalsRepositoryMock
let dayjsDateProvider: DayjsDateProvider

const dayAdd24Hours = dayjs().add(1, 'day').toDate()

describe('Create Rental', () => {
  beforeEach(() => {
    rentalsRepositoryMock = new RentalsRepositoryMock()
    dayjsDateProvider = new DayjsDateProvider()
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryMock,
      dayjsDateProvider,
    )
  })

  it('should be able to create a new rental', async () => {
    const rental = await createRentalUseCase.execute({
      user_id: '12345',
      car_id: '121212',
      expected_return_date: dayAdd24Hours,
    })

    expect(rental).toHaveProperty('id')
    expect(rental).toHaveProperty('start_date')
  })

  it('should not be able to create a new rental if there is another open then same user', async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: '12345',
        car_id: '121212',
        expected_return_date: dayAdd24Hours,
      })

      await createRentalUseCase.execute({
        user_id: '12345',
        car_id: '121212',
        expected_return_date: dayAdd24Hours,
      })
    }).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to create a new rental if there is another open tp the same car', async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: '12345',
        car_id: 'test',
        expected_return_date: dayAdd24Hours,
      })

      await createRentalUseCase.execute({
        user_id: '12345',
        car_id: 'test',
        expected_return_date: dayAdd24Hours,
      })
    }).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to create a new rental with invalid return time', async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: '12345',
        car_id: 'test',
        expected_return_date: dayjs().toDate(),
      })
    }).rejects.toBeInstanceOf(AppError)
  })
})
