const clienteModel = require("../models/clienteModel");

class ClienteService {
    // Obtener todos los clientes
    async getClientes() {
        return await clienteModel.getALLClientes();
    }

    // Obtener cliente por ID
    async getClienteById(id) {
        if (!id) throw new Error("Se requiere el ID del cliente");
        return await clienteModel.getClienteById(id);
    }

    // Obtener cliente por DNI
    async getClienteByDni(dni) {
        if (!dni) throw new Error("Se requiere el DNI del cliente");
        return await clienteModel.getClienteByDni(dni);
    }

    // Crear nuevo cliente
    async addCliente(data) {
        if (!data.dni || !data.nombre) {
            throw new Error("DNI y nombre son obligatorios");
        }
        return await clienteModel.createCliente(data);
    }

    // Actualizar cliente por ID o DNI (solo campos permitidos)
    async modifyCliente({ id, dni, ...updates }) {
        if (!id && !dni) {
            throw new Error("Se requiere ID o DNI para actualizar");
        }

        // Filtra campos no modificables (como el ID)
        const allowedUpdates = { dni, ...updates };
        return await clienteModel.updateCliente({
            id,
            dni,
            ...allowedUpdates,
        });
    }

    // Eliminar cliente por ID o DNI
    async removeCliente({ id, dni }) {
        if (!id && !dni) {
            throw new Error("Se requiere ID o DNI para eliminar");
        }
        await clienteModel.deleteCliente({ id, dni });
    }
}

module.exports = new ClienteService();