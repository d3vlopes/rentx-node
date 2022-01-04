import { Specification } from '../model/Specification'
import {
  ICreateSpecificationsDTO,
  ISpecificationsRepository,
} from './ISpecificationsRepository'

export class SpecificationsRepository implements ISpecificationsRepository {
  private specifications: Specification[]

  constructor() {
    this.specifications = []
  }

  create({ description, name }: ICreateSpecificationsDTO) {
    const specification = new Specification()

    Object.assign(specification, {
      name,
      description,
      created_at: new Date(),
    })

    this.specifications.push(specification)
  }

  findByName(name: string) {
    const specification = this.specifications.find(
      (specification) => specification.name === name,
    )

    return specification
  }
}
