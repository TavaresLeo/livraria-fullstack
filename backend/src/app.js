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

// Rotas
app.use('/api', productRoutes);
app.use('/api', orderRoutes);

module.exports = app;