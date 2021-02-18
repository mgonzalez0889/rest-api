const { response } = require('express');
 

const usuariosGet = (req, res = response) => {
    
    res.json({
        msg: 'get Api - Controlador'
    })

}

const usuariosPost = (req, res) => {
    const {nombre, edad} = req.body;
    res.json({
        msg: 'post Api - Controlador',
        nombre, edad
    })

}

const usuariosPut =  (req, res) => {

    const { id } = req.params.id;
    console.log(id);

    res.json({
        msg: 'put Api - Controlador'
    })

}

const usuariosPatch =  (req, res) => {

    res.json({
        msg: 'patch Api - Controlador'
    })

}

const usuariosDelete =  (req, res) => {

    res.json({
        msg: 'delete Api - Delete'
    })

 }


module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete,
    usuariosPatch
}