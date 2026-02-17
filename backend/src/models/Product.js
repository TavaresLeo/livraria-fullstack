const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    titulo: { type: String, required: true },
    preco: { type: Number, required: true },
    imagem: { type: String, required: true },
    descricao: { type: String, required: true }
});

module.exports = mongoose.model('Product', productSchema);