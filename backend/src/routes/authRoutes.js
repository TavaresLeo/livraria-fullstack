const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/login', authController.login);
router.post('/seed-admin', authController.createInitialAdmin); // Rota para criar o primeiro usuário

module.exports = router;