import React, { createContext, useState, useEffect } from 'react';

// Cria o contexto (a "nuvem")
export const CartContext = createContext();

const getCartItemId = (product) => product?.id ?? product?._id;

export const CartProvider = ({ children }) => {
    // Carrega do LocalStorage ou inicia vazio
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem('carrinho');
        const parsedCart = savedCart ? JSON.parse(savedCart) : [];

        // Normaliza itens antigos para evitar bugs com id indefinido
        return parsedCart.map(item => ({
            ...item,
            cartItemId: item.cartItemId ?? getCartItemId(item),
        }));
    });

    // Sempre que o carrinho mudar, salva no LocalStorage
    useEffect(() => {
        localStorage.setItem('carrinho', JSON.stringify(cart));
    }, [cart]);

    // Função: Adicionar ao Carrinho
    const addToCart = (product) => {
        const cartItemId = getCartItemId(product);

        if (!cartItemId) {
            alert('Não foi possível adicionar este produto ao carrinho.');
            return;
        }

        setCart(currentCart => {
            // Verifica se já existe
            const itemExists = currentCart.find(item => item.cartItemId === cartItemId);

            if (itemExists) {
                // Se existe, aumenta a quantidade
                return currentCart.map(item => 
                    item.cartItemId === cartItemId
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
                );
            }

            // Se não existe, adiciona com quantidade 1
            return [...currentCart, { ...product, cartItemId, quantity: 1 }];
        });

        alert('Produto adicionado ao carrinho!'); // Feedback simples
    };

    // Função: Remover do Carrinho
    const removeFromCart = (cartItemId) => {
        setCart(currentCart => currentCart.filter(item => item.cartItemId !== cartItemId));
    };

    // Função: Atualizar Quantidade (+ ou -)
    const updateQuantity = (cartItemId, amount) => {
        setCart(currentCart => {
            return currentCart.map(item => {
                if (item.cartItemId === cartItemId) {
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
