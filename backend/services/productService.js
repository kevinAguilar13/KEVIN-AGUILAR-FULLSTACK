const productModel = require("../models/productModel");
class ProductService{
    async getProducts(){
        return await productModel.getALLProducts();
    }
    async getProductById(id){
        return await productModel.getProductByid(id);
    }
    async addProduct(data){
        return await productModel.createProduct(data);
    }
    async modifyProduct(id,data){
        return await productModel.updateProduct(id,data);
    }
    async removeProduct(id){
        await productModel.deleteProduct(id);
    }

}
module.exports = new ProductService();
