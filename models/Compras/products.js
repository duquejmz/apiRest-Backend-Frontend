import { model, Schema } from 'mongoose'
import Category from '../Servicios/category.js'

const productSchema = new Schema({
    name: {
        type: String, // tipo dato
        unique: true,  // unico
        required: [true, 'The category is required'], // requerido
        maxlength: [50, 'Max 50 characters'], // tamaño max
        minlength: [2, 'Min 2 characters']
    },
    description: {
        type: String, // tipo dato
        required: [true, 'The description is required'] // requerido
    },
    price: {
        type: Number,
        required: [true, 'The price is required']
    },
    stock: {
        type: Number,
        required: [true, 'the stock is required']
    },
    category: {
        ref: 'Category',
        type: Schema.Types.ObjectId,
    }
},
{
    versionKey: false
});

export default model('Product', productSchema, 'Products') // crea la coleccion sino existe y exporta los datos