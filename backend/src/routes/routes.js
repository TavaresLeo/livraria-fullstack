const express = require('express');
const router = express.Router();
const productController = require('./controllers/productController');
const authController = require('./controllers/authController'); // Se tiver proteção

// Rotas Públicas
router.get('/produtos', productController.getAllProducts);
router.get('/produtos/:id', productController.getProductById);

// Rota de Cadastro (ADICIONE ESSA LINHA 👇)
// Se quiser proteger com login, adicione o middleware antes. Se quiser simplificar por enquanto:
router.post('/produtos', productController.createProduct);

// ... outras rotas ...

module.exports = router;