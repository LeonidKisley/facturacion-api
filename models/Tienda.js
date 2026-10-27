const mongoose = require('mongoose');

// Esquema para Tienda
const TiendaSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
      trim: true
    },
    direccion: {
      type: String,
      required: true,
      trim: true
    },
    telefono: {
      type: String,
      required: true,
      trim: true
    }
  },
  {
    versionKey: false,
    collection: 'tiendas'
  }
);

module.exports = mongoose.model('Tienda', TiendaSchema);
