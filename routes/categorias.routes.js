const {Router } = require('express');
const { check } = require('express-validator');

// Controlador de Categoria
const { crearCategoria, categoriasGet, categoriaGet, actualizarCategoria, eliminaCategoria } = require('../controllers/categoriasController');
const { existeCategoriaPorId } = require('../helpers/db-validators');
const { validarJWT, esAdminRole } = require('../middlewares');


const { validarCampos } = require('../middlewares/validar-campos');


const router = Router();


// Obtener todas las categorias
router.get('/', categoriasGet);

// Obtener categoria por ID
router.get('/:id', [
        check('id', 'No es un Id de Mongo Valido').isMongoId(),
        check('id').custom(existeCategoriaPorId),
        validarCampos,
        ],
        categoriaGet);

// Crear categoria - privado - cualquier persona con token valido
router.post('/', [
                  validarJWT,
                  check('nombre', 'El nombre es obligatorio').not().isEmpty(),
                  validarCampos
                 ], crearCategoria);

// Actualizar - privado - cualquier persona con token valido
router.put('/:id', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('id').custom(existeCategoriaPorId),
    validarCampos

], actualizarCategoria);

// Borrar una categoria - Admin
router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un Id de Mongo Valido').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    validarCampos

] , eliminaCategoria );




module.exports = router;