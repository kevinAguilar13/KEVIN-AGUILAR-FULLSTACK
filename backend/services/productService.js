const productModel = require("../models/productModel");
const createError = require('../utils/createError');

class ProductService {
    // Obtener todos los productos
    async getProducts() {
        try {
            const products = await productModel.getAllProducts();
            if (!products || products.length === 0) {
                throw createError('NotFound', 'No se encontraron productos');
            }
            return products;
        } catch (error) {
            if (error.name === 'NotFound') throw error;
            throw createError('DatabaseError', 'Error al obtener la lista de productos', {
                originalError: error.message
            });
        }
    }

    // Obtener producto por ID
    async getProductById(id) {
        if (!id) {
            throw createError('Validation', 'ID de producto es requerido', {
                field: 'id',
                issue: 'required'
            });
        }

        try {
            const product = await productModel.getProductById(id);
            if (!product) {
                throw createError('NotFound', 'Producto no encontrado', {
                    productId: id
                });
            }
            return product;
        } catch (error) {
            if (error.name === 'NotFound') throw error;
            throw createError('DatabaseError', 'Error al buscar producto por ID', {
                productId: id,
                originalError: error.message
            });
        }
    }

    // Crear nuevo producto
    async addProduct(data) {
        // Validaciones de campos requeridos
        if (!data.nombre) {
            throw createError('Validation', 'Nombre del producto es requerido', {
                field: 'nombre',
                issue: 'required'
            });
        }

        if (!data.precio) {
            throw createError('Validation', 'Precio del producto es requerido', {
                field: 'precio',
                issue: 'required'
            });
        }

        // Validación de tipo de precio
        if (isNaN(parseFloat(data.precio))) {
            throw createError('Validation', 'Precio debe ser un número válido', {
                field: 'precio',
                value: data.precio,
                issue: 'invalid_format'
            });
        }

        try {
            const newProduct = await productModel.createProduct(data);
            return newProduct;
        } catch (error) {
            // Manejo de errores específicos de la base de datos
            if (error.code === 'ER_DUP_ENTRY') {
                throw createError('Validation', 'El producto ya existe', {
                    field: 'nombre',
                    value: data.nombre,
                    issue: 'duplicate'
                });
            }
            throw createError('DatabaseError', 'Error al crear nuevo producto', {
                productData: data,
                originalError: error.message
            });
        }
    }

    // Actualizar producto
    async modifyProduct(id, data) {
        if (!id) {
            throw createError('Validation', 'ID de producto es requerido', {
                field: 'id',
                issue: 'required'
            });
        }

        // Validar que haya datos para actualizar
        if (!data || Object.keys(data).length === 0) {
            throw createError('Validation', 'Debe proporcionar al menos un campo para actualizar');
        }

        // Validación de precio si está presente
        if (data.precio && isNaN(parseFloat(data.precio))) {
            throw createError('Validation', 'Precio debe ser un número válido', {
                field: 'precio',
                value: data.precio,
                issue: 'invalid_format'
            });
        }

        try {
            const updatedProduct = await productModel.updateProduct(id, data);
            if (!updatedProduct) {
                throw createError('NotFound', 'Producto no encontrado para actualizar', {
                    productId: id
                });
            }
            return updatedProduct;
        } catch (error) {
            if (error.name === 'NotFound') throw error;
            throw createError('DatabaseError', 'Error al actualizar producto', {
                productId: id,
                updateData: data,
                originalError: error.message
            });
        }
    }

    // Eliminar producto
    async removeProduct(id) {
        if (!id) {
            throw createError('Validation', 'ID de producto es requerido', {
                field: 'id',
                issue: 'required'
            });
        }

        try {
            const result = await productModel.deleteProduct(id);
            if (!result) {
                throw createError('NotFound', 'Producto no encontrado para eliminar', {
                    productId: id
                });
            }
            return { success: true, message: 'Producto eliminado correctamente' };
        } catch (error) {
            if (error.name === 'NotFound') throw error;
            throw createError('DatabaseError', 'Error al eliminar producto', {
                productId: id,
                originalError: error.message
            });
        }
    }
}
module.exports = new ProductService();