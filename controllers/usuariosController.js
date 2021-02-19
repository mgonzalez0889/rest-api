const { response } = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');
 

const usuariosGet = async (req, res = response) => {


    const { limite = 5, desde = 0 } = req.query;
    const query = {estado: true};
    // const usuarios = await Usuario.find(query)
    //     .skip(Number(desde)) //Indica desde donde queremos iniciar la consulta 
    //     .limit(Number(limite)); // Cantidad de registros a mostrar

    // const total = await Usuario.countDocuments(query);

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip(Number(desde)) 
            .limit(Number(limite))
    ]);
    
    res.json({
        total,
        usuarios
    })

}

const usuariosPost = async (req, res) => {

   

    const { nombre, correo, password, rol  } = req.body;
    const usuario = new Usuario({nombre, correo, password, rol});

    // Verificar si el correo existe

    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync()
    usuario.password = bcryptjs.hashSync(password, salt);

    // Guardar en base de datos
    await usuario.save();

    res.json({
        usuario
    })

}

const usuariosPut =  async (req, res= response) => {

    const { id } = req.params;
    const {_id, password, google, correo, ...resto} = req.body;

    // TODO Validar contra base de datos
    if(password) {
         // Encriptar la contraseña
        const salt = bcryptjs.genSaltSync()
        resto.password = bcryptjs.hashSync(password, salt);

    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.json(usuario)

}

const usuariosPatch =  (req, res) => {

    res.json({
        msg: 'patch Api - Controlador'
    })

}

const usuariosDelete =  async (req, res) => {

    const {id} = req.params;

    // Fisicamente lo borramos
    // const usuario = await Usuario.findByIdAndDelete(id);

    const usuario = await Usuario.findByIdAndUpdate(id, { estado: false});

    res.json({
        usuario
    })

 }


module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete,
    usuariosPatch
}