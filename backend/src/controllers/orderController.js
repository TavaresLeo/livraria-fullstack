const Order = require('../models/Order');

const normalizePaymentMethod = (metodo = '') => {
    const normalized = String(metodo).toLowerCase();
    const aliases = {
        cartao_credito: 'credito',
        credito_cartao: 'credito',
        cartao_debito: 'debito',
        debito_cartao: 'debito',
        cartão_credito: 'credito',
        cartão_débito: 'debito',
    };

    return aliases[normalized] || normalized;
};

exports.createOrder = async (req, res) => {
    try {
        const { cliente, endereco, itens, total, pagamento } = req.body;

        const metodo = normalizePaymentMethod(pagamento?.metodo || 'boleto');
        const paymentData = {
            metodo,
            bandeira: pagamento?.bandeira,
            ultimos4: pagamento?.ultimos4,
        };

        const novoPedido = new Order({
            cliente,
            endereco,
            itens,
            total,
            pagamento: paymentData,
        });

        await novoPedido.save();

        console.log('--> Pedido Criado com Sucesso! ID:', novoPedido._id);

        res.status(201).json({
            message: 'Pedido realizado com sucesso!',
            orderId: novoPedido._id,
        });
    } catch (error) {
        console.error('Erro ao criar pedido:', error);
        res.status(500).json({
            message: 'Erro ao processar o pedido',
            details: error?.message,
        });
    }
};

exports.getAllOrders = async (req, res) => {
    try {
        const pedidos = await Order.find().sort({ dataPedido: -1 });
        res.status(200).json(pedidos);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar pedidos' });
    }
};

exports.updateOrderStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const pedidoAtualizado = await Order.findByIdAndUpdate(
            id,
            { status: status },
            { new: true }
        );
        res.status(200).json(pedidoAtualizado);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao atualizar status do pedido' });
    }
};
