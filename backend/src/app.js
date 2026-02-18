const express = require('express');
const cors = require('cors');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const authRoutes = require('./routes/authRoutes');

const productController = require('./controllers/productController'); 
const authController = require('./controllers/authController');

const app = express();

app.use(cors());
app.use(express.json());

// --- O PORTEIRO (Adicione isto) ---
app.use((req, res, next) => {
    console.log(`🔔 TOC TOC! Requisição recebida: ${req.method} ${req.url}`);
    next(); // Deixa passar
});
// ----------------------------------

// Rotas
// Rotas de Produtos
app.get('/api/produtos', productController.getAllProducts);
app.get('/api/produtos/:id', productController.getProductById);

// 👇 ADICIONE ESSA LINHA AQUI! 👇
app.post('/api/produtos', authController.verifyToken, productController.createProduct);
// (Adicionei o authController.verifyToken para proteger a rota, 
//  assim só quem tem Token (Admin) pode cadastrar. Se der erro, tire o verifyToken por enquanto).

// Rotas de Autenticação
app.post('/api/login', authController.login);
// ...

module.exports = app;