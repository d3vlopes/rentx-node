import { Router } from 'express'
import multer from 'multer'
import { CreateUserController } from '../../../../modules/accounts/useCases/createUser/CreateUserController'
import uploadConfig from '../../../../config/upload'

import { UpdateUserAvatarController } from '../../../../modules/accounts/useCases/updateUserAvatar/updateUserAvatarController'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'

export const usersRoutes = Router()

const uploadAvatar = multer(uploadConfig.upload('./tmp/avatar'))

const createUserController = new CreateUserController()
const updateUserAvatarController = new UpdateUserAvatarController()

usersRoutes.post('/', createUserController.handle)

usersRoutes.patch(
  '/avatar',
  ensureAuthenticated,
  uploadAvatar.single('avatar'),
  updateUserAvatarController.handle,
)
