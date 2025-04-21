const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');

// Rutas SIN el prefijo /clientes (ya está en server.js)
router.get('/', clienteController.getAllClientes);          // GET /clientes
router.get('/id/:id', clienteController.getClienteById);    // GET /clientes/id/1
router.get('/dni/:dni', clienteController.getClienteByDni); // GET /clientes/dni/12345678
router.post('/', clienteController.createCliente);          // POST /clientes
router.put('/id/:id', clienteController.updateClienteById); // PUT /clientes/id/1
router.put('/dni/:dni', clienteController.updateClienteByDni); // PUT /clientes/dni/12345678
router.delete('/id/:id', clienteController.deleteClienteById); // DELETE /clientes/id/1
router.delete('/dni/:dni', clienteController.deleteClienteByDni); // DELETE /clientes/dni/12345678

module.exports = router;