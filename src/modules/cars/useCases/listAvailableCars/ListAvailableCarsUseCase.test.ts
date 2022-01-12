import { CarsRepositoryMock } from '../../repositories/mocks/CarsRepositoryMock'
import { ListAvailableCarsUseCase } from './ListAvailableCarsUseCase'

let listAvailableUseCase: ListAvailableCarsUseCase
let carsRepositoryMock: CarsRepositoryMock

describe('List Available Cars', () => {
  beforeEach(() => {
    carsRepositoryMock = new CarsRepositoryMock()
    listAvailableUseCase = new ListAvailableCarsUseCase(carsRepositoryMock)
  })

  it('should  be able to list all available cars ', async () => {
    const car = await carsRepositoryMock.create({
      name: 'Car1',
      description: 'Car description',
      daily_rate: 110,
      license_plate: 'DEF-1232',
      fine_amount: 40,
      brand: 'Car_brand',
      category_id: 'category_id',
    })

    const cars = await listAvailableUseCase.execute({})

    expect(cars).toEqual([car])
  })

  it('should be able to list all available cars by brand', async () => {
    const car = await carsRepositoryMock.create({
      name: 'Car2',
      description: 'Car description',
      daily_rate: 110,
      license_plate: 'DEF-1232',
      fine_amount: 40,
      brand: 'Car_brand_test',
      category_id: 'category_id',
    })

    const cars = await listAvailableUseCase.execute({
      brand: 'Car_brand_test',
    })

    expect(cars).toEqual([car])
  })

  it('should be able to list all available cars by name', async () => {
    const car = await carsRepositoryMock.create({
      name: 'Car3',
      description: 'Car description',
      daily_rate: 110,
      license_plate: 'DEF-12345',
      fine_amount: 40,
      brand: 'Car_brand_test',
      category_id: 'category_id',
    })

    const cars = await listAvailableUseCase.execute({
      name: 'Car3',
    })

    expect(cars).toEqual([car])
  })

  it('should be able to list all available cars by category', async () => {
    const car = await carsRepositoryMock.create({
      name: 'Car4',
      description: 'Car description',
      daily_rate: 110,
      license_plate: 'DEF-12345',
      fine_amount: 40,
      brand: 'Car_brand_test',
      category_id: '12345',
    })

    const cars = await listAvailableUseCase.execute({
      category_id: '12345',
    })

    expect(cars).toEqual([car])
  })
})
