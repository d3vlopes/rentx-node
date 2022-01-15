import { inject, injectable } from 'tsyringe'
import { v4 as uuid } from 'uuid'
import { IDateProvider } from '../../../../shared/container/providers/DateProvider/IDateProvider'
import { IMailProvider } from '../../../../shared/container/providers/MailProvider/IMailProvider'

import { AppError } from '../../../../shared/errors/AppError'
import { IUsersRepository } from '../../repositories/IUsersRepository'
import { IUsersTokensRepository } from '../../repositories/IUsersTokensRepository'

interface IRequest {}

@injectable()
export class SendForgotPasswordMailUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,
    @inject('DayjsDateProvider')
    private dateProvider: IDateProvider,
    @inject('EtherealMailProvider')
    private mailProvider: IMailProvider,
  ) {}

  async execute(email: string) {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new AppError('User does not exists!')
    }

    const token = uuid()

    const expires_date = this.dateProvider.addHours(3)

    await this.usersTokensRepository.create({
      refresh_token: token,
      user_id: user.id,
      expires_date,
    })

    await this.mailProvider.sendMail(
      email,
      'Recuperação de senha',
      `O link para o reset é ${token}`,
    )
  }
}