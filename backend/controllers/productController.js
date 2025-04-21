const createError = require('../utils/createError');
const productService = require('../services/productService');

class ProductController {
    // Obtener todos los productos
    async getProducts(req, res, next) {
        try {
            const products = await productService.getProducts();
            res.json(products);
        } catch (error) {
            next(createError('DatabaseError', 'Error al obtener los productos', {
                originalError: error.message
            }));
        }
    }

    // Obtener producto por ID
    async getProductById(req, res, next) {
        const { id } = req.params;
        try {
            const product = await productService.getProductById(id);
            if (!product) {
                throw createError('NotFound', 'Producto no encontrado');
            }
            res.json(product);
        } catch (error) {
            next(error);
        }
    }

    // Crear nuevo producto
    async createProduct(req, res, next) {
        try {
            const { nombre, precio, descripcion } = req.body;
            
            // Validación de campos requeridos
            if (!nombre || !precio) {
                throw createError('Validation', 'Nombre y precio son obligatorios', {
                    requiredFields: ['nombre', 'precio']
                });
            }
            
            // Validación de tipo de precio
            if (isNaN(precio)) {
                throw createError('Validation', 'Precio debe ser un número', {
                    invalidField: 'precio'
                });
            }

            const newProduct = await productService.addProduct({ nombre, precio, descripcion });
            res.status(201).json(newProduct);
        } catch (error) {
            next(error);
        }
    }

    // Actualizar producto
    async updateProduct(req, res, next) {
        try {
            const { id } = req.params;
            const { nombre, precio, descripcion } = req.body;
            
            // Validación básica
            if (!nombre && !precio && !descripcion) {
                throw createError('Validation', 'Debe proporcionar al menos un campo para actualizar');
            }
            
            if (precio && isNaN(precio)) {
                throw createError('Validation', 'Precio debe ser un número');
            }

            const updatedProduct = await productService.modifyProduct(id, { nombre, precio, descripcion });
            
            if (!updatedProduct) {
                throw createError('NotFound', 'Producto no encontrado para actualizar');
            }
            
            res.json(updatedProduct);
        } catch (error) {
            next(error);
        }
    }

    // Eliminar producto
    async deleteProduct(req, res, next) {
        try {
            const { id } = req.params;
            const result = await productService.removeProduct(id);
            
            if (!result) {
                throw createError('NotFound', 'Producto no encontrado para eliminar');
            }
            
            res.sendStatus(204);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new ProductController();