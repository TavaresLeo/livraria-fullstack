const express = require('express');
const cors = require('cors');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');

const app = express();

app.use(cors());
app.use(express.json());

// --- O PORTEIRO (Adicione isto) ---
app.use((req, res, next) => {
    console.log(`🔔 TOC TOC! Requisição recebida: ${req.method} ${req.url}`);
    next(); // Deixa passar
});
// ----------------------------------

// --- ROTAS DE PRODUTOS ---
app.get('/api/produtos', productController.getAllProducts);
app.get('/api/produtos/:id', productController.getProductById);
app.post('/api/produtos', authController.verifyToken, productController.createProduct);

// --- ROTAS DE PEDIDOS (A CORREÇÃO ESTÁ AQUI 👇) ---
// 1. Rota PÚBLICA: Qualquer cliente pode CRIAR um pedido (sem token)
app.post('/api/orders', orderController.createOrder);

// 2. Rotas PROTEGIDAS: Só o Admin logado pode LER ou ATUALIZAR os pedidos
app.get('/api/orders', authController.verifyToken, orderController.getAllOrders);
app.put('/api/orders/:id/status', authController.verifyToken, orderController.updateOrderStatus);

// --- ROTAS DE AUTENTICAÇÃO ---
app.post('/api/login', authController.login);

module.exports = app;