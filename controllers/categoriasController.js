const { response } = require("express");
const {Categoria  } = require('../models')

// Obtener categorias - paginado - total - populate
// Obtener categoria - populate {}
const categoriasGet = async (req, res = response) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = {estado: true};

    const [total, categorias] = await Promise.all([
        Categoria.countDocuments(query),
        Categoria.find(query)
            .populate('usuario', 'nombre')
            .skip(Number(desde)) 
            .limit(Number(limite))
    ]);


    res.json({
        total,
        categorias
    });

}

// Obiene una categoria por su ID
const categoriaGet = async (req, res = response) => {

    const {id} = req.params;

    const cagetoria = await Categoria.findById(id).populate('usuario', 'nombre');

    res.json({
        cagetoria
    })


}


// Crea una categoria
const crearCategoria = async (req, res = response, next) => {

    const nombre = req.body.nombre.toUpperCase();

    const categoriaDb = await Categoria.findOne({nombre});

    if(categoriaDb) {
        return res.json({
            msg: `La categoria ${categoriaDb.nombre}, ya existe `
        });
    }

    // Generar datos a guardar

    const data = {
        nombre,
        usuario: req.usuario._id
    };

    // Guardar DB
    const categoria = await Categoria(data);
    await categoria.save();

    res.status(201).json(categoria)


}

// Actualizar categoria 

const actualizarCategoria = async (req, res = response) => {

    const {id} = req.params;

    const { estado, usuario, ...data } = req.body;

    
    data.nombre = data.nombre.toUpperCase();
    data.usuario = req.usuario
    
    const categoria = await Categoria.findByIdAndUpdate(id, data, {new: true});

    res.json(categoria);

}

// Borrar categoria

const eliminaCategoria = async (req, res = response) => {

    const {id} = req.params;

    const categoriaBorrada = await Categoria.findByIdAndUpdate(id, {estado: false}, {new: true});

    res.json(categoriaBorrada);

}

module.exports = {
    categoriasGet,
    crearCategoria,
    categoriaGet,
    actualizarCategoria,
    eliminaCategoria


}