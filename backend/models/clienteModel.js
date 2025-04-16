const db = require('../config/db');

class ClientModel {
    // Obtener todos los clientes
    async getALLClientes() {
        const result = await db.query('SELECT * FROM cliente');
        return result.rows;
    }

    // Obtener un cliente por ID
    async getClienteById(id) {
        const result = await db.query('SELECT * FROM cliente WHERE id = $1', [id]);
        return result.rows[0];
    }

    // Obtener un cliente por DNI
    async getClienteByDni(dni) {
        const result = await db.query('SELECT * FROM cliente WHERE dni = $1', [dni]);
        return result.rows[0];
    }

    // Crear un nuevo cliente
    async createCliente({ dni, nombre, apellido_materno, apellido_paterno, fecha_nacimiento }) {
        const result = await db.query(
            'INSERT INTO cliente (dni, nombre, apellido_materno, apellido_paterno, fecha_nacimiento) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [dni, nombre, apellido_materno, apellido_paterno, fecha_nacimiento]
        );
        return result.rows[0];
    }

    // Actualizar un cliente por ID o DNI (pero solo modificar campos permitidos, no el ID)
    async updateCliente({ id, dni, nombre, apellido_materno, apellido_paterno, fecha_nacimiento }) {
        // Validar que se proporcione un identificador
        if (!id && !dni) {
            throw new Error('Se debe proporcionar un ID o un DNI');
        }

        // Campos a actualizar (excluyendo el ID)
        const updates = [];
        const params = [];

        if (nombre !== undefined) {
            updates.push(`nombre = $${updates.length + 1}`);
            params.push(nombre);
        }
        if (apellido_materno !== undefined) {
            updates.push(`apellido_materno = $${updates.length + 1}`);
            params.push(apellido_materno);
        }
        if (apellido_paterno !== undefined) {
            updates.push(`apellido_paterno = $${updates.length + 1}`);
            params.push(apellido_paterno);
        }
        if (fecha_nacimiento !== undefined) {
            updates.push(`fecha_nacimiento = $${updates.length + 1}`);
            params.push(fecha_nacimiento);
        }
        if (dni !== undefined) {
            updates.push(`dni = $${updates.length + 1}`);
            params.push(dni);
        }

        if (updates.length === 0) {
            throw new Error('No hay campos para actualizar');
        }

        // Añadir condición WHERE (por ID o DNI)
        const whereClause = id ? `id = $${params.length + 1}` : `dni = $${params.length + 1}`;
        params.push(id || dni);

        const query = `UPDATE cliente SET ${updates.join(', ')} WHERE ${whereClause} RETURNING *`;
        const result = await db.query(query, params);
        return result.rows[0];
    }

    // Eliminar un cliente por ID o DNI
    async deleteCliente({ id, dni }) {
        if (!id && !dni) {
            throw new Error('Se debe proporcionar un ID o un DNI');
        }
        const query = id ? 'DELETE FROM cliente WHERE id = $1' : 'DELETE FROM cliente WHERE dni = $1';
        const param = id || dni;
        await db.query(query, [param]);
    }
}

module.exports = new ClientModel();