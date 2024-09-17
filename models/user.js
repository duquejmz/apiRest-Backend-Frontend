import { Schema, model } from "mongoose"

const userSchema = new Schema ({
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: [true, 'Email already exists'],
        minlength: [10, 'Min length 4 characters']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [10, 'Min length 4 characters']
    }
},
{
    timestamps: true,
    versionKey: false
})

export default model('users', userSchema, 'Users')

