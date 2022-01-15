import { DayjsDateProvider } from '../../../../shared/container/providers/DateProvider/implementations/DayjsDateProvider'
import { AppError } from '../../../../shared/errors/AppError'
import { MailProviderMock } from '../../repositories/mocks/MailProviderMock'
import { UsersRepositoryMock } from '../../repositories/mocks/UsersRepositoryMock'
import { UsersTokensRepositoryMock } from '../../repositories/mocks/UsersTokensRepository'
import { SendForgotPasswordMailUseCase } from './SendForgotPasswordMailUseCase'

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase
let usersRepositoryMock: UsersRepositoryMock
let dateProvider: DayjsDateProvider
let usersTokensRepositoryMock: UsersTokensRepositoryMock
let mailProvider: MailProviderMock

describe('Send Forgot Mail', () => {
  beforeEach(() => {
    usersTokensRepositoryMock = new UsersTokensRepositoryMock()
    usersRepositoryMock = new UsersRepositoryMock()

    dateProvider = new DayjsDateProvider()
    mailProvider = new MailProviderMock()

    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      usersRepositoryMock,
      usersTokensRepositoryMock,
      dateProvider,
      mailProvider,
    )
  })

  it('should be able to send a forgot password mail to user', async () => {
    const sendMail = jest.spyOn(mailProvider, 'sendMail')

    await usersRepositoryMock.create({
      driver_license: '12345',
      email: 'test@example.com',
      name: 'John Doe',
      password: '1234',
    })

    await sendForgotPasswordMailUseCase.execute('test@example.com')

    expect(sendMail).toHaveBeenCalled()
  })

  it('should not be able to send and email if user does not exists', async () => {
    await expect(
      sendForgotPasswordMailUseCase.execute('loren@email.com'),
    ).rejects.toEqual(new AppError('User does not exists!'))
  })

  it('should be able to create an users token', async () => {
    const generateTokenMail = jest.spyOn(usersTokensRepositoryMock, 'create')

    await usersRepositoryMock.create({
      driver_license: '12345',
      email: 'marie@example.com',
      name: 'Marie Doe',
      password: '1234',
    })

    await sendForgotPasswordMailUseCase.execute('marie@example.com')

    expect(generateTokenMail).toHaveBeenCalled()
  })
})
