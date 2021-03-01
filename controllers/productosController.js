const { response } = require("express");
const { Producto } = require('../models');



const productosGet = async (req, res = response) => {

    const {limite = 5, desde = 0} = req.query;
    const query = {estado: true};

    const [total, productos ] = await Promise.all([
        Producto.countDocuments(query),
        Producto.find(query)
            .populate('usuario', 'nombre')
            .populate('categoria', 'nombre')
            .skip(Number(desde))
            .limit(Number(limite))

    ]);

    res.json({
        total,
        productos
    });


}

const productoGet = async (req, res = response) => {
    
    const {id} = req.params;

    const producto = await Producto.findById(id)
                            .populate('usuario', 'nombre')
                            .populate('categoria', 'nombre')

    res.json({
        producto
    })


}

const crearProducto = async (req, res = response) => {

    const {estado, usuario, ...body} = req.body

    const productoDb = await Producto.findOne({ nombre: req.body.nombre }) ;

    if(productoDb) {
        return res.json({
            msg: `El producto ${productoDb.nombre}, ya existe`
        })

    }

    // Generar datos para guardar
    const data = {
        ...body,
        nombre: body.nombre.toUpperCase(),
        usuario: req.usuario._id
    };

    console.log(data);


    // Guardar Db
    const producto = await Producto(data);
    await producto.save();

    res.status(201).json(producto);


}

const actualizarProducto  = async (req, res = response) => {
    const {id} = req.params;

    const { estado, usuario, ...data } = req.body;

    if( data.nombre) {
        data.nombre = data.nombre.toUpperCase();

    }
    data.usuario = req.usuario._id
    
    const producto = await Producto.findByIdAndUpdate(id, data, {new: true});

    res.json(producto);


}

const eliminarProducto = async (req, res = response) => {

    const {id} = req.params;

    const productoBorrado = await Producto.findByIdAndUpdate(id, {estado: false}, {new: true});

    res.json(productoBorrado);


}


module.exports = {
    productosGet,
    productoGet,
    crearProducto,
    actualizarProducto,
    eliminarProducto


}