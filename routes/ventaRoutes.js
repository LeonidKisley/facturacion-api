const express = require('express');
const router = express.Router();
const Venta = require('../models/Venta');

// GET /ventas - Obtener todas las ventas con información completa
router.get('/', async (req, res) => {
  try {
    const ventas = await Venta.find()
      .populate('tienda_id')
      .populate('items.producto_id');
    
    res.status(200).json(ventas);
  } catch (error) {
    res.status(500).json({
      mensaje: 'Error al obtener las ventas',
      error: error.message
    });
  }
});

// POST /ventas - Crear una nueva venta calculando el total
router.post('/', async (req, res) => {
  try {
    const { tienda_id, items } = req.body;

    // Calcular el total sumando (cantidad * precioUnitario) de cada item
    let total = 0;
    if (Array.isArray(items)) {
      items.forEach((item) => {
        if (item.cantidad && item.precioUnitario) {
          total += item.cantidad * item.precioUnitario;
        }
      });
    }

    // Crear y guardar la venta
    const nuevaVenta = new Venta({
      tienda_id,
      items,
      total,
      fecha: new Date()
    });

    const ventaGuardada = await nuevaVenta.save();

    // Poblar la información completa para la respuesta
    const ventaPopulada = await Venta.findById(ventaGuardada._id)
      .populate('tienda_id')
      .populate('items.producto_id');

    res.status(201).json(ventaPopulada);
  } catch (error) {
    res.status(500).json({
      mensaje: 'Error al crear la venta',
      error: error.message
    });
  }
});

module.exports = router;
