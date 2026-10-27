const mongoose = require('mongoose');

// Esquema para Producto
const ProductoSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
      trim: true
    },
    precio: {
      type: Number,
      required: true,
      min: 0
    },
    marca: {
      type: String,
      required: true,
      trim: true
    },
    categoria: {
      type: String,
      required: true,
      trim: true
    }
  },
  {
    versionKey: false,
    collection: 'productos'
  }
);

module.exports = mongoose.model('Producto', ProductoSchema);
