const Product = require('../models/Product');

// Listar todos
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Buscar por ID
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: 'Produto não encontrado' });
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ESTA FUNÇÃO NOVA 👇
exports.createProduct = async (req, res) => {
    const product = new Product({
        titulo: req.body.titulo,
        descricao: req.body.descricao,
        preco: req.body.preco,
        imagem: req.body.imagem
    });

    try {
        const newProduct = await product.save();
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// ATUALIZAR O EXPORT NO FINAL 👇
exports.seedDatabase = async (req, res) => { /* ...sua função seed... */ };

// Mude o module.exports para incluir o createProduct
module.exports = {
    getAllProducts,
    getProductById,
    createProduct, // <--- NÃO ESQUEÇA DE ADICIONAR AQUI
    seedDatabase// (se tiver)
};