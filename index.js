import 'dotenv/config.js'
import Server from './models/server.js'

const server = new Server() // instanciando el objeto (class server)

server.listen()