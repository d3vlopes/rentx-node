import { Specification } from '../../infra/typeorm/entities/Specification'
import {
  ICreateSpecificationsDTO,
  ISpecificationsRepository,
} from '../ISpecificationsRepository'

export class SpecificationRepositoryMock implements ISpecificationsRepository {
  specifications: Specification[] = []

  async create({ description, name }: ICreateSpecificationsDTO) {
    const specification = new Specification()

    Object.assign(specification, {
      description,
      name,
    })

    this.specifications.push(specification)

    return specification
  }

  async findByName(name: string) {
    return this.specifications.find(
      (specification) => specification.name === name,
    )
  }

  async findByIds(ids: string[]) {
    const allSpecifications = this.specifications.filter((specification) =>
      ids.includes(specification.id),
    )

    return allSpecifications
  }
}
