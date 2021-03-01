const {Router } = require('express');
const { check } = require('express-validator');
const { productosGet, crearProducto, actualizarProducto, productoGet, eliminarProducto } = require('../controllers/productosController');
const { existeProductoPorId, existeCategoriaPorId } = require('../helpers/db-validators');
const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');

const router = Router();


// Obtener todos los productos
router.get('/', productosGet);


// Obtener productos por su ID
router.get('/:id', [
    check('id', 'No es un id de Mongo valido').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos    
], productoGet)

// crea un producto - privado - cualquier persona con token valido
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligaorio').not().isEmpty(),
    check('categoria', 'No es un id de Mongo').isMongoId(),
    check('categoria').custom( existeCategoriaPorId ),
    validarCampos

], crearProducto)

// Actualizar - privado - cualquier persona con token valido
router.put('/:id', [
    validarJWT,
    check('categoria', 'No es un id de Mongo').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos


], actualizarProducto)


// Borrar un producto - debe ser un ROLE_ADMIN
router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un id Mongo valido').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos

], eliminarProducto)


module.exports = router