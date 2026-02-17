const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Debug: Mostra no terminal se o controller foi carregado
console.log("--> Rotas: Controller carregado?", productController);

// Rota de Seed (POST)
router.post('/seed', productController.seedDatabase);

// Rotas de Produtos (GET)
router.get('/produtos', productController.getAllProducts);
router.get('/produtos/:id', productController.getProductById);

module.exports = router;