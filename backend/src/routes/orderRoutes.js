const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// Rota POST: https://minha-api-livraria.onrender.com/api/pedidos
router.post('/pedidos', orderController.createOrder);

router.get('/pedidos', orderController.getAllOrders); 
router.put('/pedidos/:id', orderController.updateOrderStatus);

module.exports = router;