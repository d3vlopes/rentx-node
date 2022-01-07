import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { ListCategoriesUseCase } from './ListCategoriesUseCase'

export class ListCategoriesController {
  async handle(req: Request, res: Response) {
    const listCategoriesControllerUseCase = container.resolve(
      ListCategoriesUseCase,
    )

    const all = await listCategoriesControllerUseCase.execute()

    return res.json(all)
  }
}
