import { Router } from 'express'
import { getCategory, getCategoryId, postCategory } from '../controllers/categoryController.js'

const categoryRouter = Router()

categoryRouter.get('/', getCategory)
categoryRouter.get('/:id', getCategoryId)
categoryRouter.post('/', postCategory)

export default categoryRouter