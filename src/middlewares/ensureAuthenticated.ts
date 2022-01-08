import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'

import { AppError } from '../errors/AppError'
import { UsersRepository } from '../modules/accounts/repositories/implementatios/UsersRepository'

interface IPayload {
  sub: string
}

export async function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    throw new AppError('Token missing', 401)
  }

  const [, token] = authHeader.split(' ')

  try {
    const { sub: userId } = verify(
      token,
      'cfe275a5908b5650488e0b0342c2d6cc',
    ) as IPayload

    const usersRepository = new UsersRepository()
    const user = usersRepository.findById(userId)

    if (!user) {
      throw new AppError('User does not exists!', 401)
    }

    next()
  } catch {
    throw new AppError('Invalid token!', 401)
  }
}
