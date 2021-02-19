const Role = require('../models/role');
const Usuario = require('../models/usuario');

const esRoleValido = async (rol = '') => {
    const existeRol = await Role.findOne({rol});
    if(!existeRol) {
           throw new Error(`El rol ${rol} no esta registrado en la BD`)
    }
}

const emailExiste = async (correo = '') => {
    const existeEmail = await Usuario.findOne({correo});
    if(existeEmail)  {
        throw new Error(`este correo ${correo} ya esta registrado`)

    }
}

const existeUsuarioPorId = async (id) => {
    const existeusuario = await Usuario.findById(id);
    if(!existeusuario)  {
        throw new Error(`No existe un usuario con este id ${id}`)

    }
}



module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId
}