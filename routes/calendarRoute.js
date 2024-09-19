import { Router } from 'express'
import { deleteCalendar, getCalendar, getCalendarId, postCalendar, putCalendar } from '../controllers/calendarController.js'

const calendarRouter = Router()

calendarRouter.get('/', getCalendar)
calendarRouter.get('/:id', getCalendarId)
calendarRouter.post('/', postCalendar)
calendarRouter.put('/:id', putCalendar)
calendarRouter.delete('/:id', deleteCalendar)

export default calendarRouter