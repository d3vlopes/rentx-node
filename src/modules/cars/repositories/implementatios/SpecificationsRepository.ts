import { getRepository, Repository } from 'typeorm'

import { Specification } from '../../entities/Specification'
import {
  ICreateSpecificationsDTO,
  ISpecificationsRepository,
} from '../ISpecificationsRepository'

export class SpecificationsRepository implements ISpecificationsRepository {
  private repository: Repository<Specification>

  constructor() {
    this.repository = getRepository(Specification)
  }

  async create({ description, name }: ICreateSpecificationsDTO) {
    const specification = this.repository.create({
      name,
      description,
    })

    await this.repository.save(specification)
  }

  async findByName(name: string) {
    const specification = this.repository.findOne({ name })

    return specification
  }
}
