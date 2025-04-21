const clienteModel = require("../models/clienteModel");
const createError = require('../utils/createError');

class ClienteService {
    // Obtener todos los clientes
    async getClientes() {
        try {
            return await clienteModel.getALLClientes();
        } catch (error) {
            throw createError('DatabaseError', 'Error al obtener clientes', {
                originalError: error.message
            });
        }
    }

    // Obtener cliente por ID
    async getClienteById(id) {
        if (!id) {
            throw createError('Validation', 'Se requiere el ID del cliente', {
                field: 'id',
                issue: 'required'
            });
        }

        try {
            const cliente = await clienteModel.getClienteById(id);
            if (!cliente) {
                throw createError('NotFound', 'Cliente no encontrado');
            }
            return cliente;
        } catch (error) {
            if (error.name === 'NotFound') throw error;
            throw createError('DatabaseError', 'Error al buscar cliente por ID');
        }
    }

    // Obtener cliente por DNI
    async getClienteByDni(dni) {
        if (!dni) {
            throw createError('Validation', 'Se requiere el DNI del cliente', {
                field: 'dni',
                issue: 'required'
            });
        }

        try {
            const cliente = await clienteModel.getClienteByDni(dni);
            if (!cliente) {
                throw createError('NotFound', 'Cliente no encontrado');
            }
            return cliente;
        } catch (error) {
            if (error.name === 'NotFound') throw error;
            throw createError('DatabaseError', 'Error al buscar cliente por DNI');
        }
    }

    // Crear nuevo cliente
    async addCliente(data) {
        if (!data.dni || !data.nombre) {
            throw createError('Validation', 'DNI y nombre son obligatorios', {
                requiredFields: ['dni', 'nombre']
            });
        }

        try {
            return await clienteModel.createCliente(data);
        } catch (error) {
            if (error.code === 'ER_DUP_ENTRY') { // Ejemplo para error de MySQL por duplicado
                throw createError('Validation', 'El DNI ya está registrado', {
                    field: 'dni',
                    issue: 'duplicate'
                });
            }
            throw createError('DatabaseError', 'Error al crear cliente');
        }
    }

    // Actualizar cliente
    async modifyCliente({ id, dni, ...updates }) {
        if (!id && !dni) {
            throw createError('Validation', 'Se requiere ID o DNI para actualizar');
        }

        try {
            const result = await clienteModel.updateCliente({ id, dni, ...updates });
            if (!result) {
                throw createError('NotFound', 'Cliente no encontrado para actualizar');
            }
            return result;
        } catch (error) {
            if (error.name === 'NotFound') throw error;
            throw createError('DatabaseError', 'Error al actualizar cliente');
        }
    }

    // Eliminar cliente
    async removeCliente({ id, dni }) {
        if (!id && !dni) {
            throw createError('Validation', 'Se requiere ID o DNI para eliminar');
        }

        try {
            const result = await clienteModel.deleteCliente({ id, dni });
            if (!result) {
                throw createError('NotFound', 'Cliente no encontrado para eliminar');
            }
            return result;
        } catch (error) {
            if (error.name === 'NotFound') throw error;
            throw createError('DatabaseError', 'Error al eliminar cliente');
        }
    }
}

module.exports = new ClienteService();