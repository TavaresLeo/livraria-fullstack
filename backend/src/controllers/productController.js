const Product = require('../models/Product');

// 1. Listar todos
const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 2. Buscar por ID
const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: 'Produto não encontrado' });
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 3. Criar Produto (A FUNÇÃO QUE FALTAVA)
const createProduct = async (req, res) => {
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

// 4. Função Seed (Deixei vazia para não dar erro, já que vamos usar o script do navegador)
const seedDatabase = async (req, res) => {
    res.json({ message: "Use o script do frontend para popular o banco!" });
};

// EXPORTAÇÃO CORRETA E LIMPA ✅
module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    seedDatabase
};