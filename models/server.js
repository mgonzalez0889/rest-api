const express = require('express');
const cors = require('cors');
const {db} = require('../database/config');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosRoute = '/api/usuarios';
        this.authPath = '/api/auth';

        // COnectar a base de datos
        this.conectarDB();

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicacion
        this.routes();
    }

    async conectarDB(){
        await db();
    }

    middlewares() {

        // CORS
        this.app.use(cors());

        // Parseo y lectura
        this.app.use(express.json());

        // Directorio public
        this.app.use(express.static('public'));

    }

    routes() {
        this.app.use(this.authPath, require('../routes/auth'));       
        this.app.use(this.usuariosRoute, require('../routes/usuarios.routes'));       
    }

    listen() {
        this.app.listen(process.env.PORT, () => {
            console.log('Servidor corriendo en puerto', this.port);
        });        
    }
}


module.exports = Server;