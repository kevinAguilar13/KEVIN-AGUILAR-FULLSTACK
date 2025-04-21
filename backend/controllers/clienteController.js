const clienteService = require('../services/clienteService');
const createError = require('../utils/createError');

class ClienteController {
    // Obtener todos los clientes
    async getAllClientes(req, res, next) {
        try {
            const clientes = await clienteService.getClientes();
            res.status(200).json(clientes);
        } catch (error) {
            next(error); // Pasa el error al middleware
        }
    }

    // Obtener cliente por ID
    async getClienteById(req, res, next) {
        const { id } = req.params;
        try {
            const cliente = await clienteService.getClienteById(id);
            if (!cliente) {
                throw createError('NotFound', 'Cliente no encontrado');
            }
            res.status(200).json(cliente);
        } catch (error) {
            next(error);
        }
    }

    // Obtener cliente por DNI
    async getClienteByDni(req, res, next) {
        const { dni } = req.params;
        try {
            const cliente = await clienteService.getClienteByDni(dni);
            if (!cliente) {
                throw createError('NotFound', 'Cliente no encontrado');
            }
            res.status(200).json(cliente);
        } catch (error) {
            next(error);
        }
    }

    // Crear un nuevo cliente
    async createCliente(req, res, next) {
        try {
            const { dni, nombre, apellido_materno, apellido_paterno, fecha_nacimiento } = req.body;
            
            if (!dni || !nombre) {
                throw createError('Validation', 'DNI y nombre son obligatorios', {
                    requiredFields: ['dni', 'nombre']
                });
            }
            
            const nuevoCliente = await clienteService.addCliente({
                dni,
                nombre,
                apellido_materno,
                apellido_paterno,
                fecha_nacimiento
            });
            
            res.status(201).json(nuevoCliente);
        } catch (error) {
            next(error);
        }
    }

    // Actualizar cliente por ID
    async updateClienteById(req, res, next) {
        const { id } = req.params;
        const { dni, ...updates } = req.body;
        
        try {
            const clienteActualizado = await clienteService.modifyCliente({ id, dni, ...updates });
            
            if (!clienteActualizado) {
                throw createError('NotFound', 'Cliente no encontrado');
            }
            
            res.status(200).json(clienteActualizado);
        } catch (error) {
            next(error);
        }
    }

    // Actualizar cliente por DNI
    async updateClienteByDni(req, res, next) {
        const { dni } = req.params;
        const updates = req.body;
        
        try {
            const clienteActualizado = await clienteService.modifyCliente({ dni, ...updates });
            
            if (!clienteActualizado) {
                throw createError('NotFound', 'Cliente no encontrado');
            }
            
            res.status(200).json(clienteActualizado);
        } catch (error) {
            next(error);
        }
    }

    // Eliminar cliente por ID
    async deleteClienteById(req, res, next) {
        const { id } = req.params;
        
        try {
            const result = await clienteService.removeCliente({ id });
            
            if (!result) {
                throw createError('NotFound', 'Cliente no encontrado para eliminar');
            }
            
            res.status(204).end();
        } catch (error) {
            next(error);
        }
    }

    // Eliminar cliente por DNI
    async deleteClienteByDni(req, res, next) {
        const { dni } = req.params;
        
        try {
            const result = await clienteService.removeCliente({ dni });
            
            if (!result) {
                throw createError('NotFound', 'Cliente no encontrado para eliminar');
            }
            
            res.status(204).end();
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new ClienteController();