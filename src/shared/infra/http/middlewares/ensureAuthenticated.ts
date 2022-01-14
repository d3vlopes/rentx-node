import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'
import { auth } from '../../../../config/auth'

import { UsersRepository } from '../../../../modules/accounts/infra/typeorm/repositories/UsersRepository'
import { UsersTokensRepository } from '../../../../modules/accounts/infra/typeorm/repositories/UsersTokensRepository'
import { AppError } from '../../../errors/AppError'

interface IPayload {
  sub: string
}

export async function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const authHeader = req.headers.authorization
  const userTokensRepository = new UsersTokensRepository()

  if (!authHeader) {
    throw new AppError('Token missing', 401)
  }

  const [, token] = authHeader.split(' ')

  try {
    const { sub: userId } = verify(token, auth.secret_refresh_token) as IPayload

    const user = userTokensRepository.findByUserIdAndRefreshToken(userId, token)

    if (!user) {
      throw new AppError('User does not exists!', 401)
    }

    req.user = {
      id: userId,
    }

    next()
  } catch {
    throw new AppError('Invalid token!', 401)
  }
}
