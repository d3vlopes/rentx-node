import { getRepository, Repository } from 'typeorm'

import { ICreateUserDTO } from '../../dtos/ICreateUserDTO'
import { User } from '../../entities/User'
import { IUsersRepository } from '../IUsersRepository'

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>

  constructor() {
    this.repository = getRepository(User)
  }

  async create({
    name,
    username,
    email,
    driver_license,
    password,
  }: ICreateUserDTO) {
    const user = await this.repository.create({
      name,
      username,
      email,
      driver_license,
      password,
    })

    await this.repository.save(user)
  }
}
