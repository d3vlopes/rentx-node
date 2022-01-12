import { Entity, PrimaryColumn, Column, CreateDateColumn } from 'typeorm'
import { v4 as uuid } from 'uuid'

@Entity('cars_image')
export class CarImage {
  @PrimaryColumn()
  id: string

  @Column()
  car_id: string

  @Column()
  image_name: string

  @CreateDateColumn()
  created_at: Date

  constructor() {
    if (!this.id) {
      this.id = uuid()
    }
  }
}
