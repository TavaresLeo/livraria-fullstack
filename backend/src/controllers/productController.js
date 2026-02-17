const Product = require('../models/Product');

// 1. Buscar TODOS
exports.getAllProducts = async (req, res) => {
    console.log("--> Controller: Chegou no getAllProducts"); 
    try {
        const produtos = await Product.find();
        console.log("--> Controller: Achou", produtos.length, "produtos");
        res.status(200).json(produtos);
    } catch (error) {
        console.error("--> Controller: ERRO", error);
        res.status(500).json({ message: "Erro ao buscar produtos" });
    }
};

// 2. Buscar UM
exports.getProductById = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const product = await Product.findOne({ id: id });
        if (!product) return res.status(404).json({ message: "Produto não encontrado" });
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar produto" });
    }
};

// 3. Alimentar o Banco (SEED)
exports.seedDatabase = async (req, res) => {
    try {
        const produtosIniciais = [
             { id: 1, titulo: "Café com Deus Pai", preco: 84.50, imagem: "img/cafe-com-Deus.jpg", descricao: "Renovação espiritual diária." },
             { id: 2, titulo: "Harry Potter", preco: 54.50, imagem: "img/calice-de-fogo.jpg", descricao: "Magia e aventura em Hogwarts." },
             { id: 3, titulo: "Como Fazer Amigos", preco: 34.50, imagem: "img/como-fazer-amigos.jpg", descricao: "Clássico sobre relacionamentos." },
             { id: 4, titulo: "Heartstopper", preco: 39.90, imagem: "img/de-maos-dadas.jpg", descricao: "Romance adolescente." },
             { id: 5, titulo: "Deixe de Ser Pobre", preco: 48.60, imagem: "img/deixa-de-se-pobre!.jpg", descricao: "Educação financeira." },
             { id: 6, titulo: "Fahrenheit 451", preco: 41.50, imagem: "img/fahrenheit.jpg", descricao: "Distopia clássica." },
             { id: 7, titulo: "A Garota do Lago", preco: 29.90, imagem: "img/garota-do-lago.jpg", descricao: "Thriller de suspense." },
             { id: 8, titulo: "Mais Esperto que o Diabo", preco: 43.50, imagem: "img/mais-esperto.jpg", descricao: "Autoajuda e mindset." }
        ];

        await Product.deleteMany({});
        await Product.insertMany(produtosIniciais);
        
        console.log("--> Controller: Banco alimentado com sucesso!");
        res.status(201).json({ message: "Banco populado!" });
    } catch (error) {
        console.error("--> Controller: Erro no Seed", error);
        res.status(500).json({ message: "Erro no Seed" });
    }
};