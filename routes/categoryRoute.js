import { Router } from 'express'
import { deleteCategory, getCategory, getCategoryId, postCategory, putCategory } from '../controllers/categoryController.js'

const categoryRouter = Router()

categoryRouter.get('/', getCategory)
categoryRouter.get('/:id', getCategoryId)
categoryRouter.post('/', postCategory)
categoryRouter.put('/:id', putCategory)
categoryRouter.delete('/:id', deleteCategory)

export default categoryRouter