const express = require('express');
const cors = require('cors');

// Importando os Controladores
const productController = require('./controllers/productController'); 
const authController = require('./controllers/authController');

const app = express();

app.use(cors());
app.use(express.json());

// --- O PORTEIRO (Logger) ---
app.use((req, res, next) => {
    console.log(`🔔 TOC TOC! Requisição recebida: ${req.method} ${req.url}`);
    next();
});
// ---------------------------

// --- ROTAS ---

// 1. Rotas de Produtos
app.get('/api/produtos', productController.getAllProducts);
app.get('/api/produtos/:id', productController.getProductById);

// ROTA DE CRIAÇÃO (Protegida)
// Se der erro de token, remova o 'authController.verifyToken' temporariamente
app.post('/api/produtos', authController.verifyToken, productController.createProduct);

// 2. Rotas de Autenticação
app.post('/api/login', authController.login);

module.exports = app;