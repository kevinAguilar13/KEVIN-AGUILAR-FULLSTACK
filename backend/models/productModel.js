const db = require('../config/db');
const createError = require('../utils/createError');

class ProductModel {
    // Obtener todos los productos
    async getAllProducts() {
        try {
            const result = await db.query('SELECT * FROM producto');
            return result.rows;
        } catch (error) {
            throw createError('DatabaseError', 'Error al obtener todos los productos', {
                query: 'SELECT * FROM producto',
                originalError: error.message
            });
        }
    }

    // Obtener producto por ID
    async getProductById(id) {
        try {
            const result = await db.query('SELECT * FROM producto WHERE id = $1', [id]);
            
            if (result.rows.length === 0) {
                throw createError('NotFound', 'Producto no encontrado', {
                    productId: id
                });
            }
            
            return result.rows[0];
        } catch (error) {
            if (error.name === 'NotFound') throw error;
            
            throw createError('DatabaseError', 'Error al buscar producto por ID', {
                productId: id,
                query: 'SELECT * FROM producto WHERE id = $1',
                originalError: error.message
            });
        }
    }

    // Crear nuevo producto
    async createProduct({ nombre, precio, descripcion }) {
        try {
            const result = await db.query(
                'INSERT INTO producto(nombre, precio, descripcion) VALUES ($1, $2, $3) RETURNING *',
                [nombre, precio, descripcion]
            );
            
            return result.rows[0];
        } catch (error) {
            // Manejo de errores específicos de PostgreSQL
            if (error.code === '23505') { // Violación de unique constraint
                throw createError('Validation', 'El nombre del producto ya existe', {
                    field: 'nombre',
                    value: nombre,
                    issue: 'duplicate'
                });
            }
            
            throw createError('DatabaseError', 'Error al crear producto', {
                productData: { nombre, precio, descripcion },
                originalError: error.message
            });
        }
    }

    // Actualizar producto
    async updateProduct(id, { nombre, precio, descripcion }) {
        try {
            const result = await db.query(
                'UPDATE producto SET nombre = $1, precio = $2, descripcion = $3 WHERE id = $4 RETURNING *',
                [nombre, precio, descripcion, id]
            );
            
            if (result.rows.length === 0) {
                throw createError('NotFound', 'Producto no encontrado para actualizar', {
                    productId: id
                });
            }
            
            return result.rows[0];
        } catch (error) {
            if (error.name === 'NotFound') throw error;
            
            if (error.code === '23505') { // Violación de unique constraint
                throw createError('Validation', 'El nombre del producto ya existe', {
                    field: 'nombre',
                    value: nombre,
                    issue: 'duplicate'
                });
            }
            
            throw createError('DatabaseError', 'Error al actualizar producto', {
                productId: id,
                updateData: { nombre, precio, descripcion },
                originalError: error.message
            });
        }
    }

    // Eliminar producto
    async deleteProduct(id) {
        try {
            const result = await db.query(
                'DELETE FROM producto WHERE id = $1 RETURNING id',
                [id]
            );
            
            if (result.rows.length === 0) {
                throw createError('NotFound', 'Producto no encontrado para eliminar', {
                    productId: id
                });
            }
            
            return { deletedId: id };
        } catch (error) {
            if (error.name === 'NotFound') throw error;
            
            throw createError('DatabaseError', 'Error al eliminar producto', {
                productId: id,
                originalError: error.message
            });
        }
    }
}

module.exports = new ProductModel();