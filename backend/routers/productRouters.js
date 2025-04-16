const express = require('express');
const router = express.Router();
const productController =require('../controllers/productController')


// solicitud de tipo  get en la url /api/products
router.get('/',(req , res) => productController.getProducts(req ,res));

router.get('/:id',(req , res) => productController.getProductById(req ,res));

router.post('/',(req , res) => productController.createProduct(req ,res));

router.put('/:id',(req , res) => productController.updateProduct(req ,res));

router.delete('/:id',(req , res) => productController.deleProduct(req ,res));



module.exports = router;


