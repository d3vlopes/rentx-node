import { AppError } from '../../../../shared/errors/AppError'
import { CarsRepositoryMock } from '../../repositories/mocks/CarsRepositoryMock'
import { SpecificationRepositoryMock } from '../../repositories/mocks/SpecificationRepositoryMock'
import { CreateCarSpecificationUseCase } from './CreateCarSpecificationUseCase'

let creteCarSpecificationUseCase: CreateCarSpecificationUseCase
let carsRepositoryMock: CarsRepositoryMock
let specificationsRepositoryMock: SpecificationRepositoryMock

describe('Create Car Specification', () => {
  beforeEach(() => {
    specificationsRepositoryMock = new SpecificationRepositoryMock()
    carsRepositoryMock = new CarsRepositoryMock()
    creteCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carsRepositoryMock,
      specificationsRepositoryMock,
    )
  })

  it('should not be able to add a new specification to a not exist car', () => {
    expect(async () => {
      const car_id = '12345'
      const specifications_id = ['54321']

      await creteCarSpecificationUseCase.execute({ car_id, specifications_id })
    }).rejects.toBeInstanceOf(AppError)
  })

  it('should be able to add a new specification to the car', async () => {
    const car = await carsRepositoryMock.create({
      name: 'Name Car',
      description: 'Description Car',
      daily_rate: 100,
      license_plate: 'ABC-1234',
      fine_amount: 60,
      brand: 'Brand',
      category_id: 'category',
    })

    const specification = await specificationsRepositoryMock.create({
      description: 'test',
      name: 'test',
    })

    const specifications_id = [specification.id]

    const specificationsCars = await creteCarSpecificationUseCase.execute({
      car_id: car.id,
      specifications_id,
    })

    expect(specificationsCars).toHaveProperty('specifications')
    expect(specificationsCars.specifications.length).toBe(1)
  })
})
