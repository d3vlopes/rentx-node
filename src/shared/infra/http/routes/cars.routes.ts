import { Router } from 'express'
import { CreateCarController } from '../../../../modules/cars/useCases/createCar/CreateCarController'

export const carRoutes = Router()

const createCarController = new CreateCarController()

carRoutes.post('/', createCarController.handle)
