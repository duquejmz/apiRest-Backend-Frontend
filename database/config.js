/* require('dotenv')
const mongoose = require('mongoose')

const dbUri = process.env.MONGO_CNN || 'mongodb+srv://jimenezcamila137:hef31bys90J*@cluster0.ezdkolb.mongodb.net/SoftSolutionsTest?retryWrites=true&w=majority&appName=Cluster0'

function dbConnect() {
    mongoose.connect(dbUri)
        .then(() => console.log('Connection to the database'))
        .catch(err => console.error('Error connecting to database:', err));
} */
/* const dbConnect = async () => {
    try {
        // connect to database
        await moongose.connect(process.env.MONGO_CNN)
        console.log('Connect to database');
    } catch (error) {
        console.log(error);
    }
} */

/* import { connect } from 'mongoose'

const dbConnect = async() => {
    try {
        await connect(process.env.MONGO_CNN)
        console.log('Connect to server database');
    } catch (error) {
        console.log(error);
    }
}
export default dbConnect */  //Export the function

import { connect } from 'mongoose'

export async function dbConnect() {
    try {
        await connect(process.env.MONGO_CNN)
        console.log('Connect to server database');
    } catch (error) {
        console.log(error);
    }
}
export default dbConnect