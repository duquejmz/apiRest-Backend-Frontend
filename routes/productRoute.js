import { Router } from 'express'
import { getProduct, putProduct, deleteProduct, postProduct, getProductId } from '../controllers/productController.js'

const productRouter = Router()

productRouter.get('/', getProduct);
productRouter.get('/:id', getProductId)
productRouter.post('/', postProduct);
productRouter.put('/:id', putProduct);
productRouter.delete('/:id', deleteProduct);

export default productRouter