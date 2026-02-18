const Order = require('../models/Order');

exports.createOrder = async (req, res) => {
    try {
        const { cliente, endereco, itens, total, pagamento } = req.body;

        // Cria o novo pedido na memória
        const novoPedido = new Order({
            cliente,
            endereco,
            itens,
            total,
            pagamento: pagamento || { metodo: 'pix' }
        });

        // Salva no MongoDB
        await novoPedido.save();

        console.log("--> Pedido Criado com Sucesso! ID:", novoPedido._id);
        
        res.status(201).json({ 
            message: "Pedido realizado com sucesso!", 
            orderId: novoPedido._id 
        });

    } catch (error) {
        console.error("Erro ao criar pedido:", error);
        res.status(500).json({ message: "Erro ao processar o pedido" });
    }
};

exports.getAllOrders = async (req, res) => {
    try {
        // Busca todos os pedidos e ordena do mais novo para o mais antigo
        const pedidos = await Order.find().sort({ dataPedido: -1 });
        res.status(200).json(pedidos);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar pedidos" });
    }
};

exports.updateOrderStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        // Atualiza o status do pedido
        const pedidoAtualizado = await Order.findByIdAndUpdate(
            id, 
                { status: status },
                { new: true } // Retorna o pedido atualizado
        );
        res.status(200).json(pedidoAtualizado);
    } catch (error) {
        res.status(500).json({ message: "Erro ao atualizar status do pedido" });
    }  
};