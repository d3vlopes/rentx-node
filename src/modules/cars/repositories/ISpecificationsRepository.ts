import { Specification } from '../infra/typeorm/entities/Specification'

export interface ICreateSpecificationsDTO {
  name: string
  description: string
}

export interface ISpecificationsRepository {
  create({
    description,
    name,
  }: ICreateSpecificationsDTO): Promise<Specification>
  findByName(name: string): Promise<Specification>
  findByIds(ids: string[]): Promise<Specification[]>
}
