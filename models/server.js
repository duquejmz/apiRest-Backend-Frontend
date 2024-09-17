import express, { json } from 'express'
import dbConnect from '../database/config.js'
import '../database/config.js'
import productRouter from '../routes/productRoute.js';
import userRouter from '../routes/userRoute.js';
import authRouter from '../routes/authRoute.js';
import categoryRouter from '../routes/categoryRoute.js';
import cors from 'cors';
import proveedorRouter from '../routes/proveedorRoute.js';
import calendarRouter from '../routes/calendarRoute.js';


class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3000;
        // this.host = process.env.HOST || '127.0.0.1';
        this.pathProduct = '/api/products';
        // this.pathCategory = '/api-category';
        // this.pathUser = '/api-user';
        // this.pathAuth = '/api-auth'

        // Initialize methods in the correct order
        this.middlewares(); 
        this.routes();
        this.dbConnection(); 
    }

    async dbConnection() {
        await dbConnect();
    }

    middlewares() {
        // Add middleware to parse JSON
        this.app.use(json());
        this.app.use( cors());
    } 

    routes() {
        // this.app.get(this.pathProduct, getProduct);
        // this.app.post(this.pathProduct, postProduct);
        // this.app.put(this.pathProduct, putProduct);
        // this.app.delete(this.pathProduct+'/:id', deleteProduct);
        // this.app.get(this.pathCategory, getCategory);
        // this.app.post(this.pathCategory, postCategory);
        this.app.use(this.pathProduct, productRouter);
        this.app.use('/api/category', categoryRouter);
        this.app.use('/api/suppliers', proveedorRouter);
        this.app.use('/api/calendar', calendarRouter);
        this.app.use('/api/user', userRouter);
        this.app.use('/login', authRouter);
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server is running at http://localhost:${this.port}`);
        });
    }
}

export default Server

// Tarea: crear nuevamente la cadena de conexion. Crear un proyecto que se permita conectar al servidor de node y a mongo. 