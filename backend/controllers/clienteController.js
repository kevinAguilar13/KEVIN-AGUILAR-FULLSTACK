const clienteService = require('../services/clienteService');

class ClienteController {
    // Obtener todos los clientes
    async getAllClientes(req, res) {
        try {
            const clientes = await clienteService.getClientes();
            res.status(200).json(clientes);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener clientes', error: error.message });
        }
    }

    // Obtener cliente por ID
    async getClienteById(req, res) {
        const { id } = req.params;
        try {
            const cliente = await clienteService.getClienteById(id);
            if (!cliente) {
                return res.status(404).json({ message: 'Cliente no encontrado' });
            }
            res.status(200).json(cliente);
        } catch (error) {
            res.status(500).json({ message: 'Error al buscar cliente por ID', error: error.message });
        }
    }

    // Obtener cliente por DNI
    async getClienteByDni(req, res) {
        const { dni } = req.params;
        try {
            const cliente = await clienteService.getClienteByDni(dni);
            if (!cliente) {
                return res.status(404).json({ message: 'Cliente no encontrado' });
            }
            res.status(200).json(cliente);
        } catch (error) {
            res.status(500).json({ message: 'Error al buscar cliente por DNI', error: error.message });
        }
    }

    // Crear un nuevo cliente
    async createCliente(req, res) {
        try {
            const { dni, nombre, apellido_materno, apellido_paterno, fecha_nacimiento } = req.body;
            if (!dni || !nombre) {
                return res.status(400).json({ message: 'DNI y nombre son obligatorios' });
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
            res.status(500).json({ message: 'Error al crear cliente', error: error.message });
        }
    }

    // Actualizar cliente por ID (desde URL) y campos permitidos (desde body)
    async updateClienteById(req, res) {
        const { id } = req.params;
        const { dni, ...updates } = req.body; // Permitir actualizar DNI y otros campos, excepto el ID
        try {
            const clienteActualizado = await clienteService.modifyCliente({ id, dni, ...updates });
            if (!clienteActualizado) {
                return res.status(404).json({ message: 'Cliente no encontrado' });
            }
            res.status(200).json(clienteActualizado);
        } catch (error) {
            res.status(500).json({ message: 'Error al actualizar cliente', error: error.message });
        }
    }

    // Actualizar cliente por DNI (desde URL) y campos permitidos (desde body)
    async updateClienteByDni(req, res) {
        const { dni } = req.params;
        const updates = req.body; // Permitir actualizar otros campos, incluido el DNI si se envía
        try {
            const clienteActualizado = await clienteService.modifyCliente({ dni, ...updates });
            if (!clienteActualizado) {
                return res.status(404).json({ message: 'Cliente no encontrado' });
            }
            res.status(200).json(clienteActualizado);
        } catch (error) {
            res.status(500).json({ message: 'Error al actualizar cliente', error: error.message });
        }
    }

    // Eliminar cliente por ID
    async deleteClienteById(req, res) {
        const { id } = req.params;
        try {
            await clienteService.removeCliente({ id });
            res.status(204).end(); // Éxito sin contenido
        } catch (error) {
            res.status(500).json({ message: 'Error al eliminar cliente', error: error.message });
        }
    }

    // Eliminar cliente por DNI
    async deleteClienteByDni(req, res) {
        const { dni } = req.params;
        try {
            await clienteService.removeCliente({ dni });
            res.status(204).end(); // Éxito sin contenido
        } catch (error) {
            res.status(500).json({ message: 'Error al eliminar cliente', error: error.message });
        }
    }
}

module.exports = new ClienteController();