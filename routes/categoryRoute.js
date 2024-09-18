import { Router } from 'express'
import { getCategory, getCategoryId, postCategory, putCategory } from '../controllers/categoryController.js'

const categoryRouter = Router()

categoryRouter.get('/', getCategory)
categoryRouter.get('/:id', getCategoryId)
categoryRouter.post('/', postCategory)
categoryRouter.put('/:id', putCategory)

export default categoryRouter