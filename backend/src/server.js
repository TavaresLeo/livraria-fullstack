require('dotenv').config(); // Tenta ler o arquivo .env (se existir)
const app = require('./app');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 3000;

// A MÁGICA ACONTECE AQUI:
// O código pega o endereço que configuramos no Render (MONGO_URI).
// Se não achar (ex: no seu PC sem .env), ele usa o localhost como reserva.
const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/livraria';

console.log('Tentando conectar ao banco...');

mongoose.connect(mongoUri)
    .then(() => {
        console.log('🍃 MongoDB Conectado com Sucesso!');
        // Só inicia o servidor se o banco conectar
        app.listen(PORT, () => {
            console.log(`🚀 Servidor rodando na porta ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('❌ Erro ao conectar no MongoDB:', error);
    });