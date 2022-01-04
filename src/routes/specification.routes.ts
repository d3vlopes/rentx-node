import { Request, Response, Router } from 'express'

import { SpecificationsRepository } from '../modules/cars/repositories/SpecificationsRepository'
import { CreateSpecification } from '../modules/cars/services/CreateSpecification'

export const specificationRoutes = Router()

const specificationsRepository = new SpecificationsRepository()

specificationRoutes.post('/', (req: Request, res: Response) => {
  const { name, description } = req.body

  const createSpecificationService = new CreateSpecification(
    specificationsRepository,
  )

  createSpecificationService.execute({ name, description })

  return res.status(201).send()
})
