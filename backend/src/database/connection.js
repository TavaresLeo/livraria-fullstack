const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // Tenta conectar usando a string do .env
        await mongoose.connect(process.env.MONGO_URI);
        
        console.log("MongoDB Conectado com Sucesso! 🍃");
    } catch (error) {
        console.error("Erro ao conectar no MongoDB:", error);
        process.exit(1); // Encerra o servidor se der erro grave
    }
};

module.exports = connectDB;