import { Request, Response, Router } from 'express'

import { CategoriesRepository } from '../repositories/CategoriesRepository'

export const categoriesRoutes = Router()

const categoriesRepository = new CategoriesRepository()

categoriesRoutes.post('/', (req: Request, res: Response) => {
  const { name, description } = req.body

  const categoryAlreadyExists = categoriesRepository.findByName(name)

  if (categoryAlreadyExists) {
    return res.status(400).json({ error: 'Category already exist' })
  }

  categoriesRepository.create({ name, description })

  return res.status(201).send()
})

categoriesRoutes.get('/', (req: Request, res: Response) => {
  const all = categoriesRepository.list()

  return res.json(all)
})
