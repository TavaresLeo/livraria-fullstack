const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// SEGREDO DO CRACHÁ (Em produção, isso ficaria no .env)
const JWT_SECRET = 'minha_chave_secreta_super_segura'; 

// 1. FAZER LOGIN
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Procura o usuário
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Email ou senha inválidos" });

        // Compara a senha digitada com a senha criptografada no banco
        const senhaValida = await bcrypt.compare(password, user.password);
        if (!senhaValida) return res.status(400).json({ message: "Email ou senha inválidos" });

        // Se deu tudo certo, cria o CRACHÁ (Token)
        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });

        res.json({ token, message: "Login realizado com sucesso!" });

    } catch (error) {
        res.status(500).json({ message: "Erro no servidor" });
    }
};

// 2. CRIAR O PRIMEIRO ADMIN (SEED)
exports.createInitialAdmin = async (req, res) => {
    try {
        // Verifica se já existe
        const existe = await User.findOne({ email: "admin@loja.com" });
        if (existe) return res.status(400).json({ message: "Admin já existe!" });

        // Criptografa a senha "123456"
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash("123456", salt);

        // Salva
        const novoAdmin = new User({
            email: "admin@loja.com",
            password: hashedPassword
        });

        await novoAdmin.save();
        res.status(201).json({ message: "Admin criado: admin@loja.com / 123456" });

    } catch (error) {
        res.status(500).json({ message: "Erro ao criar admin", error });
    }
};