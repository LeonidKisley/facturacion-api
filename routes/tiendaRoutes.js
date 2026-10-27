const express = require('express');
const router = express.Router();
const Tienda = require('../models/Tienda');

// GET /tiendas - Obtener todas las tiendas
router.get('/', async (req, res) => {
  try {
    const tiendas = await Tienda.find();
    res.status(200).json(tiendas);
  } catch (error) {
    res.status(500).json({
      mensaje: 'Error al obtener las tiendas',
      error: error.message
    });
  }
});

// POST /tiendas - Crear una nueva tienda
router.post('/', async (req, res) => {
  try {
    const nuevaTienda = new Tienda(req.body);
    const tiendaGuardada = await nuevaTienda.save();
    res.status(201).json(tiendaGuardada);
  } catch (error) {
    res.status(500).json({
      mensaje: 'Error al crear la tienda',
      error: error.message
    });
  }
});

module.exports = router;
