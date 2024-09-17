import { Router } from 'express'
import { getCalendar, postCalendar } from '../controllers/calendarController.js'

const calendarRouter = Router()

calendarRouter.get('/', getCalendar)
calendarRouter.post('/', postCalendar)

export default calendarRouter