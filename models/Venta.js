const mongoose = require('mongoose');

// Esquema para cada item de la venta
const ItemSchema = new mongoose.Schema(
  {
    producto_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Producto',
      required: true
    },
    cantidad: {
      type: Number,
      required: true,
      min: 1
    },
    precioUnitario: {
      type: Number,
      required: true,
      min: 0
    }
  },
  {
    _id: false
  }
);

// Esquema para Venta
const VentaSchema = new mongoose.Schema(
  {
    tienda_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tienda',
      required: true
    },
    fecha: {
      type: Date,
      default: Date.now
    },
    items: {
      type: [ItemSchema],
      required: true
    },
    total: {
      type: Number,
      required: true,
      min: 0
    }
  },
  {
    versionKey: false,
    collection: 'ventas'
  }
);

module.exports = mongoose.model('Venta', VentaSchema);
