const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    cliente: {
        nome: { type: String, required: true }, // Vamos pedir o nome no checkout
        email: { type: String, required: false }
    },
    endereco: {
        rua: { type: String, required: true },
        numero: { type: String, required: true },
        bairro: { type: String, required: true },
        cidade: { type: String, required: true },
        estado: { type: String, required: true },
        cep: { type: String, required: true }
    },
    itens: [
        {
            produtoId: { type: Number, required: true },
            titulo: { type: String, required: true },
            quantidade: { type: Number, required: true },
            precoUnitario: { type: Number, required: true }
        }
    ],
    total: { type: Number, required: true },
    status: { type: String, default: 'Pendente' }, // Pendente, Pago, Enviado
    dataPedido: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);