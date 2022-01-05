import { Request, Response } from 'express'

import { ListCategoriesUseCase } from './ListCategoriesUseCase'

export class ListCategoriesController {
  constructor(private listCategoriesControllerUseCase: ListCategoriesUseCase) {}

  handle(req: Request, res: Response) {
    const all = this.listCategoriesControllerUseCase.execute()

    return res.json(all)
  }
}
