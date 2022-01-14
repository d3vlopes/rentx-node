import { Repository, getRepository } from 'typeorm'

import { ICreateUserTokensDTO } from '../../../dtos/ICreateUserTokensDTO'
import { IUsersTokensRepository } from '../../../repositories/IUsersTokensRepository'
import { UserTokens } from '../entities/UserTokens'

export class UsersTokensRepository implements IUsersTokensRepository {
  private repository: Repository<UserTokens>

  constructor() {
    this.repository = getRepository(UserTokens)
  }

  async create({ expires_date, refresh_token, user_id }: ICreateUserTokensDTO) {
    const userToken = this.repository.create({
      expires_date,
      refresh_token,
      user_id,
    })

    await this.repository.save(userToken)

    return userToken
  }

  async findByUserIdAndRefreshToken(user_id: string, refresh_token: string) {
    const usersTokens = await this.repository.findOne({
      user_id,
      refresh_token,
    })

    return usersTokens
  }

  async deleteById(id: string) {
    await this.repository.delete(id)
  }
}
