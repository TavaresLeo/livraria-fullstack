const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    cliente: {
        nome: { type: String, required: true },
        email: { type: String, required: false },
    },
    endereco: {
        rua: { type: String, required: true },
        numero: { type: String, required: true },
        bairro: { type: String, required: true },
        cidade: { type: String, required: true },
        estado: { type: String, required: true },
        cep: { type: String, required: true },
    },
    itens: [
        {
            // Aceita IDs legados (Number) e IDs Mongo (_id String)
            produtoId: { type: mongoose.Schema.Types.Mixed, required: true },
            titulo: { type: String, required: true },
            quantidade: { type: Number, required: true },
            precoUnitario: { type: Number, required: true },
        },
    ],
    total: { type: Number, required: true },
    pagamento: {
        metodo: { type: String, enum: ['pix', 'boleto', 'credito', 'debito'], required: true },
        bandeira: { type: String, required: false },
        ultimos4: { type: String, required: false },
    },
    status: { type: String, default: 'Pendente' },
    dataPedido: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Order', orderSchema);
