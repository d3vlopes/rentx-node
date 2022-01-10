import { AppError } from '../../../../errors/AppError'
import { ICreateUserDTO } from '../../dtos/ICreateUserDTO'
import { UsersRepositoryMock } from '../../repositories/mocks/UsersRepositoryMock'
import { CreateUserUseCase } from '../createUser/CreateUserUseCase'
import { AuthenticationUserUseCase } from './AuthenticationUserUseCase'

let authenticateUserUseCase: AuthenticationUserUseCase
let usersRepositoryMock: UsersRepositoryMock
let createUserUseCase: CreateUserUseCase

describe('Authenticate User', () => {
  beforeEach(() => {
    usersRepositoryMock = new UsersRepositoryMock()
    authenticateUserUseCase = new AuthenticationUserUseCase(usersRepositoryMock)
    createUserUseCase = new CreateUserUseCase(usersRepositoryMock)
  })

  it('should be able to authenticate an user', async () => {
    const user: ICreateUserDTO = {
      driver_license: '000123',
      email: 'user@test.com',
      password: '1234',
      name: 'User Test',
    }

    await createUserUseCase.execute(user)

    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    })

    expect(result).toHaveProperty('token')
  })

  it('should not be able to authenticate an not exists user', async () => {
    expect(async () => {
      await authenticateUserUseCase.execute({
        email: 'false@email.com',
        password: '1234',
      })
    }).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able authenticate with incorrect password', () => {
    expect(async () => {
      const user: ICreateUserDTO = {
        driver_license: '9999',
        email: 'user@user.com',
        password: '1234',
        name: 'User Test Error',
      }

      await createUserUseCase.execute(user)

      await authenticateUserUseCase.execute({
        email: user.email,
        password: 'incorrectPassowrd',
      })
    }).rejects.toBeInstanceOf(AppError)
  })
})
