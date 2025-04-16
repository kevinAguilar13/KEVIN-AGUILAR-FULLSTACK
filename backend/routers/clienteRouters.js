const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');

// Agrega el prefijo "/clientes" a todas las rutas
router.get('/clientes', clienteController.getAllClientes);
router.get('/clientes/id/:id', clienteController.getClienteById);
router.get('/clientes/dni/:dni', clienteController.getClienteByDni);
router.post('/clientes', clienteController.createCliente);
router.put('/clientes/id/:id', clienteController.updateClienteById);
router.put('/clientes/dni/:dni', clienteController.updateClienteByDni);
router.delete('/clientes/id/:id', clienteController.deleteClienteById);
router.delete('/clientes/dni/:dni', clienteController.deleteClienteByDni);

module.exports = router;