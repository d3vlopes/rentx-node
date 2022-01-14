import { inject, injectable } from 'tsyringe'
import { compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'

import { IUsersRepository } from '../../repositories/IUsersRepository'
import { AppError } from '../../../../shared/errors/AppError'
import { IUsersTokensRepository } from '../../repositories/IUsersTokensRepository'
import { auth } from '../../../../config/auth'
import { IDateProvider } from '../../../../shared/container/providers/DateProvider/IDateProvider'

interface IRequest {
  email: string
  password: string
}

interface IResponse {
  user: {
    name: string
    email: string
  }
  token: string
  refresh_token: string
}

@injectable()
export class AuthenticationUserUseCase {
  constructor(
    @inject('UsersRepository')
    private UsersRepository: IUsersRepository,
    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,
    @inject('DayjsDateProvider')
    private dateProvider: IDateProvider,
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    // verifica se o usuário existe
    const user = await this.UsersRepository.findByEmail(email)

    if (!user) {
      throw new AppError('Email or password incorrect!')
    }

    const passwordMatch = await compare(password, user.password)

    if (!passwordMatch) {
      throw new AppError('Email or password incorrect!')
    }

    const token = sign({}, auth.secret_token, {
      subject: user.id,
      expiresIn: auth.expires_in_token,
    })

    const refresh_token = sign({ email }, auth.secret_refresh_token, {
      subject: user.id,
      expiresIn: auth.expires_in_refresh_token,
    })

    const refresh_token_expires_date = this.dateProvider.addDays(
      auth.expires_refresh_token_days,
    )

    await this.usersTokensRepository.create({
      user_id: user.id,
      expires_date: refresh_token_expires_date,
      refresh_token,
    })

    const tokenReturn: IResponse = {
      token,
      user: {
        name: user.name,
        email: user.email,
      },
      refresh_token,
    }

    return tokenReturn
  }
}
