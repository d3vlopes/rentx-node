import { SpecificationsRepository } from '../../repositories/implementatios/SpecificationsRepository'
import { CreateSpecificationController } from './CreateSpecificationController'
import { CreateSpecificationUseCase } from './CreateSpecificationUseCase'

const specificationsRepository = new SpecificationsRepository()
const createSpecificationUseCase = new CreateSpecificationUseCase(
  specificationsRepository,
)
const createSpecificationController = new CreateSpecificationController(
  createSpecificationUseCase,
)

export { createSpecificationController }
