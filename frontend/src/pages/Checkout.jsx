import React, { useState, useContext } from 'react';
import { Container, Row, Col, Form, Button, Card, Spinner, Alert } from 'react-bootstrap';
import { CartContext } from '../context/CartContext';
import { BiCheckCircle, BiMap, BiCreditCard } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
    const { cart, clearCart } = useContext(CartContext);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Calcula total
    const total = cart.reduce((acc, item) => acc + (item.preco * item.quantity), 0);

    const handleFinalizarCompra = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const token = localStorage.getItem('token');

        if (!token) {
            setError("Você precisa estar logado para comprar!");
            setLoading(false);
            setTimeout(() => navigate('/login'), 2000);
            return;
        }

        // 1. FORMATAR DADOS PARA O BACKEND
        const pedido = {
            itens: cart.map(item => ({
                produto: item.id || item._id, // O Backend espera o ID do produto
                quantidade: item.quantity
            })),
            total: total
        };

        try {
            // 2. ENVIAR PARA A API DO RENDER
            const response = await fetch('https://minha-api-livraria.onrender.com/api/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // Envia o Token
                },
                body: JSON.stringify(pedido)
            });

            const data = await response.json();

            if (response.ok) {
                alert("🎉 Compra realizada com sucesso!");
                clearCart();
                navigate('/');
            } else {
                throw new Error(data.message || "Erro ao processar pedido");
            }

        } catch (err) {
            console.error("Erro no checkout:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (cart.length === 0) {
        return (
            <Container className="mt-5 text-center">
                <h3>Carrinho Vazio</h3>
                <Button variant="warning" onClick={() => navigate('/')}>Voltar</Button>
            </Container>
        );
    }

    return (
        <Container className="py-5">
            <h2 className="mb-4">💳 Finalizar Compra</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            
            <Row>
                <Col md={8}>
                    <Card className="mb-4 shadow-sm">
                        <Card.Header className="bg-white fw-bold"><BiMap className="me-2"/>Endereço de Entrega</Card.Header>
                        <Card.Body>
                            <Form>
                                <Row>
                                    <Col md={10}><Form.Control placeholder="Rua" className="mb-3" defaultValue="Rua das Flores" /></Col>
                                    <Col md={2}><Form.Control placeholder="Nº" className="mb-3" defaultValue="123" /></Col>
                                </Row>
                                <Row>
                                    <Col md={6}><Form.Control placeholder="Bairro" defaultValue="Centro" /></Col>
                                    <Col md={6}><Form.Control placeholder="CEP" defaultValue="12345-678" /></Col>
                                </Row>
                            </Form>
                        </Card.Body>
                    </Card>

                    <Card className="shadow-sm">
                        <Card.Header className="bg-white fw-bold"><BiCreditCard className="me-2"/>Pagamento</Card.Header>
                        <Card.Body>
                            <Form.Check type="radio" label="Cartão de Crédito" name="pgto" defaultChecked className="mb-2"/>
                            <Form.Check type="radio" label="PIX" name="pgto" className="mb-2"/>
                            <Form.Check type="radio" label="Boleto" name="pgto" />
                        </Card.Body>
                    </Card>
                </Col>

                <Col md={4}>
                    <Card className="shadow-sm bg-light">
                        <Card.Body>
                            <h4>Resumo</h4>
                            <hr />
                            {cart.map(item => (
                                <div key={item.id} className="d-flex justify-content-between mb-2 small">
                                    <span>{item.quantity}x {item.titulo}</span>
                                    <span>R$ {(item.preco * item.quantity).toFixed(2)}</span>
                                </div>
                            ))}
                            <hr />
                            <div className="d-flex justify-content-between fw-bold fs-5">
                                <span>Total</span>
                                <span className="text-success">R$ {total.toFixed(2)}</span>
                            </div>
                            <Button 
                                variant="success" 
                                size="lg" 
                                className="w-100 mt-4" 
                                onClick={handleFinalizarCompra}
                                disabled={loading}
                            >
                                {loading ? <Spinner size="sm" animation="border"/> : "Confirmar Pedido"}
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Checkout;