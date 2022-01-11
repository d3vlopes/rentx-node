import { v4 as uuid } from 'uuid'

export class Car {
  id: string

  name: string

  description: string

  daily_rate: number

  available: boolean

  license_plate: string

  fine_amount: number

  brand: string

  category_id: string

  created_at: Date

  constructor() {
    if (!this.id) {
      // adiciona essa informações ao cria um novo carro
      this.id = uuid()
      this.available = true
      this.created_at = new Date()
    }
  }
}
