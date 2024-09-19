import { Router } from 'express'
import { deleteSupplier, getSupplier, getSupplierId, postSupplier, putSupplier } from '../controllers/proveedoresController.js'


const proveedorRouter = Router()

proveedorRouter.get('/', getSupplier)
proveedorRouter.get('/:id', getSupplierId)
proveedorRouter.post('/', postSupplier)
proveedorRouter.put('/:id', putSupplier)
proveedorRouter.delete('/:id', deleteSupplier)


export default proveedorRouter