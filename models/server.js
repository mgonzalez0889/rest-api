const express = require('express');
const cors = require('cors');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosRoute = '/api/usuarios';

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicacion
        this.routes();
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
        this.app.use(this.usuariosRoute, require('../routes/usuarios.routes'));       
    }

    listen() {
        this.app.listen(process.env.PORT, () => {
            console.log('Servidor corriendo en puerto', this.port);
        });        
    }
}


module.exports = Server;