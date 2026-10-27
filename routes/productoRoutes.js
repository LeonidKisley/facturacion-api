const express = require('express');
const router = express.Router();
const Producto = require('../models/Producto');

// GET /productos - Obtener todos los productos
router.get('/', async (req, res) => {
  try {
    const productos = await Producto.find();
    res.status(200).json(productos);
  } catch (error) {
    res.status(500).json({
      mensaje: 'Error al obtener los productos',
      error: error.message
    });
  }
});

// POST /productos - Crear un nuevo producto
router.post('/', async (req, res) => {
  try {
    const nuevoProducto = new Producto(req.body);
    const productoGuardado = await nuevoProducto.save();
    res.status(201).json(productoGuardado);
  } catch (error) {
    res.status(500).json({
      mensaje: 'Error al crear el producto',
      error: error.message
    });
  }
});

module.exports = router;
