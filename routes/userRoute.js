import { Router } from 'express'
import { getUser, postUser } from '../controllers/userController.js'

const userRouter = Router()

userRouter.get('/', getUser);
userRouter.post('/', postUser);

export default userRouter