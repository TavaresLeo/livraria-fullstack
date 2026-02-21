const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const authController = require('../controllers/authController');

// Debug: Mostra no terminal se o controller foi carregado
console.log('--> Rotas: Controller carregado?', productController);

// Rota de Seed (POST)
router.post('/seed', productController.seedDatabase);

// Rotas de Produtos
router.get('/produtos', productController.getAllProducts);
router.get('/produtos/:id', productController.getProductById);
router.post('/produtos', authController.verifyToken, productController.createProduct);

module.exports = router;
