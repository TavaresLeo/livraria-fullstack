const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// Rota POST: http://localhost:3000/api/pedidos
router.post('/pedidos', orderController.createOrder);

router.get('/pedidos', orderController.getAllOrders); 
router.put('/pedidos/:id', orderController.updateOrderStatus);

module.exports = router;