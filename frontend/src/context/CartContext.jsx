/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, useEffect } from 'react';

// Cria o contexto (a "nuvem")
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    // Carrega do LocalStorage ou inicia vazio
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem('carrinho');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    // Sempre que o carrinho mudar, salva no LocalStorage
    useEffect(() => {
        localStorage.setItem('carrinho', JSON.stringify(cart));
    }, [cart]);

    // Função: Adicionar ao Carrinho
    const addToCart = (product) => {
        setCart(currentCart => {
            // Verifica se já existe
            const itemExists = currentCart.find(item => item.id === product.id);

            if (itemExists) {
                // Se existe, aumenta a quantidade
                return currentCart.map(item => 
                    item.id === product.id 
                    ? { ...item, quantity: item.quantity + 1 } 
                    : item
                );
            } else {
                // Se não existe, adiciona com quantidade 1
                return [...currentCart, { ...product, quantity: 1 }];
            }
        });
        alert("Produto adicionado ao carrinho!"); // Feedback simples
    };

    // Função: Remover do Carrinho
    const removeFromCart = (productId) => {
        setCart(currentCart => currentCart.filter(item => item.id !== productId));
    };

    // Função: Atualizar Quantidade (+ ou -)
    const updateQuantity = (productId, amount) => {
        setCart(currentCart => {
            return currentCart.map(item => {
                if (item.id === productId) {
                    const newQuantity = item.quantity + amount;
                    // Evita quantidade menor que 1
                    return { ...item, quantity: newQuantity < 1 ? 1 : newQuantity };
                }
                return item;
            });
        });
    };

    const clearCart = () => {
        setCart([]); // Define o array como vazio
    };

    // Calcula o total de itens para o Badge (ex: 2 Harry Potter + 1 Café = 3 itens)
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, totalItems }}>
            {children}
        </CartContext.Provider>
    );
};