import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { AuthenticationUserUseCase } from './AuthenticationUserUseCase'

export class AuthenticationUserController {
  async handle(req: Request, res: Response) {
    const { password, email } = req.body

    const authenticationUseCase = container.resolve(AuthenticationUserUseCase)

    const token = await authenticationUseCase.execute({ email, password })

    return res.json(token)
  }
}
