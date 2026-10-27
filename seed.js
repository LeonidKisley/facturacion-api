require('dotenv').config();
const mongoose = require('mongoose');

// Importar modelos
const Tienda = require('./models/Tienda');
const Producto = require('./models/Producto');
const Venta = require('./models/Venta');

const MONGO_URI = process.env.MONGO_URI;

async function seed() {
  try {
    // Conexión a MongoDB
    await mongoose.connect(MONGO_URI);
    console.log('Conectado a MongoDB para ejecutar seed...');

    // Limpiar base de datos
    await Tienda.deleteMany({});
    await Producto.deleteMany({});
    await Venta.deleteMany({});
    console.log('Base de datos limpiada correctamente.');

    // Crear Tienda
    const tienda = await Tienda.create({
      nombre: 'Tienda Central',
      direccion: 'Av. Principal 456, Ciudad',
      telefono: '555-9876'
    });
    console.log('Tienda creada:', tienda.nombre);

    // Crear 2 Productos
    const producto1 = await Producto.create({
      nombre: 'Camiseta Básica',
      precio: 150,
      marca: 'UrbanStyle',
      categoria: 'Ropa'
    });
    console.log('Producto creado:', producto1.nombre);

    const producto2 = await Producto.create({
      nombre: 'Jeans Slim',
      precio: 450,
      marca: 'DenimCo',
      categoria: 'Ropa'
    });
    console.log('Producto creado:', producto2.nombre);

    // Registrar 1 Venta relacionada con los ObjectId generados
    const itemsVenta = [
      {
        producto_id: producto1._id,
        cantidad: 2,
        precioUnitario: producto1.precio
      },
      {
        producto_id: producto2._id,
        cantidad: 1,
        precioUnitario: producto2.precio
      }
    ];

    // Calcular total
    const totalVenta = itemsVenta.reduce((acum, item) => {
      return acum + item.cantidad * item.precioUnitario;
    }, 0);

    const venta = await Venta.create({
      tienda_id: tienda._id,
      fecha: new Date(),
      items: itemsVenta,
      total: totalVenta
    });

    console.log('Venta registrada con éxito. Total:', totalVenta);
    console.log('\nDatos generados:');
    console.log('- tienda_id:', tienda._id.toString());
    console.log('- producto_id 1:', producto1._id.toString());
    console.log('- producto_id 2:', producto2._id.toString());
    console.log('- venta_id:', venta._id.toString());
  } catch (error) {
    console.error('Error al ejecutar el seed:', error.message);
  } finally {
    // Desconexión
    await mongoose.disconnect();
    console.log('\nDesconectado de MongoDB.');
  }
}

seed();
