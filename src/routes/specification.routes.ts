import { Request, Response, Router } from 'express'

import { createSpecificationController } from '../modules/cars/useCases/createSpecification'
export const specificationRoutes = Router()

specificationRoutes.post('/', (req: Request, res: Response) => {
  return createSpecificationController.handle(req, res)
})
