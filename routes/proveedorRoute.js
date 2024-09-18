import { Router } from 'express'
import { deleteSupplier, getSupplier, postSupplier, putSupplier } from '../controllers/proveedoresController.js'


const proveedorRouter = Router()

proveedorRouter.get('/', getSupplier)
proveedorRouter.post('/', postSupplier)
proveedorRouter.put('/', putSupplier)
proveedorRouter.delete('/', deleteSupplier)


export default proveedorRouter