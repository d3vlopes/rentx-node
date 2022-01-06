import { Specification } from '../entities/Specification'

export interface ICreateSpecificationsDTO {
  name: string
  description: string
}

export interface ISpecificationsRepository {
  create({ description, name }: ICreateSpecificationsDTO): void
  findByName(name: string): Specification
}
