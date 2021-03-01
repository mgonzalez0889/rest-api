const express = require('express');
const cors = require('cors');
const {db} = require('../database/config');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            auth: '/api/auth',
            buscar: '/api/buscar',
            categorias: '/api/categorias',
            usuarios: '/api/usuarios',
            productos: '/api/productos',

        }

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
        this.app.use(this.paths.auth, require('../routes/auth'));       
        this.app.use(this.paths.buscar, require('../routes/buscar.routes'));       
        this.app.use(this.paths.categorias, require('../routes/categorias.routes'));       
        this.app.use(this.paths.usuarios, require('../routes/usuarios.routes'));       
        this.app.use(this.paths.productos, require('../routes/productos.routes'));       
    }

    listen() {
        this.app.listen(process.env.PORT, () => {
            console.log('Servidor corriendo en puerto', this.port);
        });        
    }
}


module.exports = Server;