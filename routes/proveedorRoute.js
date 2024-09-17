import { Router } from 'express'
import { getSupplier, postSupplier } from '../controllers/proveedoresController.js'

const proveedorRouter = Router()

proveedorRouter.get('/', getSupplier)
proveedorRouter.post('/', postSupplier)

export default proveedorRouter