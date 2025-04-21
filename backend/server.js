const express = require('express');
const cors = require('cors');
const productRoutes = require('./routers/productRouters');
const clienteroutes = require('./routers/clienteRouters');
const errorHandler = require('./middlewares/errorHandler');

class Server {
  constructor() {
    this.app = express();
    this.config();
    this.routes();
    this.addErrorHandler(); // Añadir el manejador de errores
  }

  config() {
    this.app.use(express.json());
    this.app.use(cors());
  }

  routes() {
    this.app.use('/productos', productRoutes);
    this.app.use('/clientes', clienteroutes);
  }

  // Nuevo método para el manejo de errores
  addErrorHandler() {
    this.app.use(errorHandler);
  }

  start() {
    const PORT = process.env.PORT || 3000;
    this.app.listen(PORT, () => {
      console.log(`Servidor corriendo en el puerto ${PORT}`);
    });
  }
}

const server = new Server();
server.start();