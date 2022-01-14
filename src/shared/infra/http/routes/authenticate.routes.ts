import { Router } from 'express'

import { AuthenticationUserController } from '../../../../modules/accounts/useCases/authenticationUser/AuthenticationUserController'
import { RefreshTokenController } from '../../../../modules/accounts/useCases/refreshToken/RefreshTokenController'

export const authenticateRoutes = Router()

const authenticationUserController = new AuthenticationUserController()
const refreshTokenController = new RefreshTokenController()

authenticateRoutes.post('/sessions', authenticationUserController.handle)
authenticateRoutes.post('/refresh-token', refreshTokenController.handle)
