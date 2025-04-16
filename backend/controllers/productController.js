const { json } = require('express');
const productService = require('../services/productService');


class productController {
    //req y res son objetos
    async getProducts(req, res) {

        try {
            const products =await productService.getProducts();
            res.json(products);
        } catch (error) {
            console.error(error);
            res.status(500).json({message:'Error al obtener los productos'});
            
        }
    }
    async getProductById(req , res){
        const {id} = req.params;
        try{
            const product = await productService.getProductById(id);
            if(!product){
                return res.status(404).json({ message:'Producto no encontrado'});
            }
            res.json(product);
        }catch (error){
            console.error(error);
            res.status(500).json({message:'Error al obtener el producto'});
        }    
    }

    async createProduct(req , res){
        try{
            const{nombre , precio , descripcion}=req.body;
            const newProduct = await productService.addProduct({
                nombre,precio,descripcion});
                res.status(201).json(newProduct);
            }catch (error){
                console.error(error);
                res.status(500).json({message:'Error al crear el producto'});
            }
        }
    async updateProduct(req , res){
        try{
            const {id} = req.params;
            const {nombre , precio , descripcion} = req.body;
            const updatedProduct = await productService.modifyProduct(id,{
                nombre,precio,descripcion});
                res.json(updatedProduct);
        }catch (error){
            console.error(error);
            res.status(500).json({message:'Error al actualizar el producto'});
        }
    }
    // eliminar producto
    async deleProduct(req, res){
        try{
            const {id} = req.params;
            await productService.removeProduct(id);
            res.sendStatus(204);
        }catch (error){
            console.error(error);
            res.status(500).json({message: 'Error al eliminar el producto'});
        }
    }
    //obterner todos los productos
    async getProducts(req , res){
        try{
            const products = await productService.getProducts();
            res.json(products);
        }catch (error){
            console.error(error);
            res.status(500).json({message:'Error al obtener los productos'});
        }
    }
}
module.exports = new productController();
