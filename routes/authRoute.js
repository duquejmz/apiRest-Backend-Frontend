import { Router } from "express"
import { Login } from "../controllers/userController.js"

const authRouter = Router()

authRouter.post('/', Login)

export default authRouter