import { model, Schema } from 'mongoose'

const agendaSchema = new Schema({
    name: {
        type: String, // tipo dato
        unique: true,  // unico
        required: [true, 'The name is required'], // requerido
        maxlength: [100, 'Max 100 characters'], // tamaño max
        minlength: [2, 'Min 2 characters']
    },
    description: {
        type: String,
        required: [true, 'the description is required']
    },
    startDay: {
        type: Date,
    }
},
{
    versionKey: false
}
)

export default model('Calendar', agendaSchema, 'Calendars')