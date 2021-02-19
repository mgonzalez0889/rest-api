const {Router } = require('express');
const { check } = require('express-validator');


const {validarCampos} = require('../middlewares/validar-campos');
const { esRoleValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');

const {usuariosGet,
       usuariosPost,
       usuariosPut,
       usuariosPatch,
       usuariosDelete} = require('../controllers/usuariosController');

const router = Router();


router.get('/', usuariosGet);

router.post('/',[ 
                 check('nombre', 'El nombre es obligatorio').not().isEmpty(), 
                 check('password', 'El password es obligatorio y mas de 6 letras').isLength({min: 6}), 
                 check('correo', 'El correo no es valido').isEmail(), 
                 // check('rol', 'El rol no es valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
                 check('rol').custom( esRoleValido ),
                 check('correo').custom( emailExiste ),
                 validarCampos
                ], usuariosPost);

router.put('/:id',[
       check('id', 'No es un Id Valido').isMongoId(),
       check('id').custom(existeUsuarioPorId),
       check('rol').custom( esRoleValido ),
       validarCampos
],
usuariosPut);

router.patch('/', usuariosPatch);

router.delete('/:id', [
       check('id', 'No es un Id Valido').isMongoId(),
       check('id').custom(existeUsuarioPorId),
       validarCampos

],
usuariosDelete);


module.exports = router;