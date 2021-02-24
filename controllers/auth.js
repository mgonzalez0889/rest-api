const {response} = require('express');
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/generarJWT');


const login  = async (req, res) => {

    const {correo, password} = req.body;

    try {

        // Verificar si el email existe
        const usuario = await Usuario.findOne({correo});

        if(!usuario) {
            return res.status(400).json({
                msg: "Usuario / Password no son correctos - correo"
            })
        }

        // Si el usuario esta activo
        if(!usuario.estado) {
            return res.status(400).json({
                msg: "Usuario / Password no son correctos - estado: false"
            })
        }

        // Verificar la contraseña

        const validPassword = bcrypt.compareSync(password, usuario.password);
        if(!validPassword) {
            return res.status(400).json({
                msg: "Usuario / Password no son correctos - Password incorrecto"
            })
        }

        // Generar el JWT
        const token = await generarJWT(usuario.id);

        res.json({
            usuario,
            token
        })
        
    } catch (error) {
        return res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }  



}




module.exports = {
    login

}