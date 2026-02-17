require('dotenv').config();
const app = require('./app');
const connectDB = require('./database/connection');

// Conecta ao MongoDB antes de iniciar o servidor
connectDB();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT} 🚀`);
});