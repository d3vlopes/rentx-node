import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { ImportCategoryUseCase } from './ImportCategoryUseCase'

export class ImportCategoryController {
  handle(req: Request, res: Response) {
    const { file } = req

    const importCategoryUseCase = container.resolve(ImportCategoryUseCase)

    importCategoryUseCase.execute(file)

    return res.send()
  }
}
