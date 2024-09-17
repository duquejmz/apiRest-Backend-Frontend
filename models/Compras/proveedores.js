import { model, Schema } from 'mongoose'

const proveedorSchema = new Schema({
    name: {
        type: String, // tipo dato
        unique: true,  // unico
        required: [true, 'The category is required'], // requerido
        maxlength: [50, 'Max 50 characters'], // tamaño max
        minlength: [2, 'Min 2 characters']
    },
    email: {
        type: String,
        required: [true, 'The email is required'] 
    },
    phone: {
        type: Number,
        required: [true, 'The phone is required']
    },
    address: {
        type: String,
        required: [true, 'the address is required']
    }
},
{
    versionKey : false
});

export default model('Proveedor', proveedorSchema, 'Suppliers')