import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreateRentalUseCase } from './CreateRentalUseCase'

export class CreateRentalController {
  async handle(req: Request, res: Response) {
    const { id } = req.user
    const { expected_return_date, car_id } = req.body

    const createRentalUseCase = container.resolve(CreateRentalUseCase)

    const rental = await createRentalUseCase.execute({
      user_id: id,
      expected_return_date,
      car_id,
    })

    return res.status(201).json(rental)
  }
}
