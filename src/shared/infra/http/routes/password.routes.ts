import { Router } from 'express'
import { SendForgotPasswordMailController } from '../../../../modules/accounts/useCases/sendForgotPasswordMail/SendForgotPasswordMailController'

export const passwordRoutes = Router()

const sendForgotPasswordMailController = new SendForgotPasswordMailController()

passwordRoutes.post('/forgot', sendForgotPasswordMailController.handle)
