import { Router } from 'express'
import { AuthenticationUserController } from '../modules/accounts/useCases/authenticationUser/AuthenticationUserController'

export const authenticateRoutes = Router()

const authenticationUserController = new AuthenticationUserController()

authenticateRoutes.post('/sessions', authenticationUserController.handle)
