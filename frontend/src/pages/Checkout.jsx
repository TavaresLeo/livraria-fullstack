import React, { useState, useContext } from 'react';
import { Container, Row, Col, Form, Button, Card, Spinner, Alert } from 'react-bootstrap';
import { CartContext } from '../context/CartContext';
import { BiCheckCircle, BiMap, BiCreditCard } from 'react-icons/bi';
import { useNavigate, Link } from 'react-router-dom';

const Checkout = () => {
    const { cart, clearCart } = useContext(CartContext);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const total = cart.reduce((acc, item) => acc + (item.preco * item.quantity), 0);

    const handleFinalizarCompra = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        // Pedido no formato que o MongoDB espera
        const pedido = {
            itens: cart.map(item => ({
                produto: item._id || item.id,
                quantidade: item.quantity
            })),
            total: total
        };

        try {
            // Mandando para a API Pública que liberamos no Passo 1
            const response = await fetch('https://minha-api-livraria.onrender.com/api/orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(pedido)
            });

            if (response.ok) {
                alert("🎉 Compra realizada com sucesso! Seu pedido foi registrado.");
                clearCart();
                navigate('/'); // Manda o cliente feliz de volta pra Home
            } else {
                const data = await response.json();
                throw new Error(data.message || "Erro ao processar o pedido");
            }
        } catch (err) {
            console.error("Erro:", err);
            setError("Não foi possível finalizar a compra. O servidor pode estar dormindo.");
        } finally {
            setLoading(false);
        }
    };

    if (cart.length === 0) {
        return (
            <Container className="mt-5 text-center py-5">
                <h3>Seu carrinho está vazio.</h3>
                <Link to="/"><Button variant="warning" className="mt-3">Voltar para Loja</Button></Link>
            </Container>
        );
    }

    return (
        <Container className="py-5">
            <h2 className="mb-4 fw-bold">Finalizar Pedido</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            
            <Row>
                <Col md={8}>
                    <Card className="mb-4 shadow-sm border-0">
                        <Card.Header className="bg-white fw-bold"><BiMap className="me-2"/>Dados de Entrega (Simulação)</Card.Header>
                        <Card.Body>
                            <Form>
                                <Row>
                                    <Col md={10}><Form.Control placeholder="Endereço Completo" className="mb-3" defaultValue="Rua dos Clientes, 123" /></Col>
                                    <Col md={2}><Form.Control placeholder="Nº" className="mb-3" defaultValue="123" /></Col>
                                </Row>
                            </Form>
                        </Card.Body>
                    </Card>

                    <Card className="shadow-sm border-0 mb-4">
                        <Card.Header className="bg-white fw-bold"><BiCreditCard className="me-2"/>Pagamento</Card.Header>
                        <Card.Body>
                            <Form.Check type="radio" label="Cartão de Crédito" name="pgto" defaultChecked className="mb-2"/>
                            <Form.Check type="radio" label="PIX" name="pgto" />
                        </Card.Body>
                    </Card>
                </Col>

                <Col md={4}>
                    <Card className="shadow-sm border-0 bg-light">
                        <Card.Body>
                            <h4 className="fw-bold mb-3">Resumo</h4>
                            <hr />
                            {cart.map(item => (
                                <div key={item._id || item.id} className="d-flex justify-content-between mb-2 small text-muted">
                                    <span>{item.quantity}x {item.titulo.substring(0,20)}...</span>
                                    <span>R$ {(item.preco * item.quantity).toFixed(2).replace('.', ',')}</span>
                                </div>
                            ))}
                            <hr />
                            <div className="d-flex justify-content-between fw-bold fs-5 mb-4">
                                <span>Total</span>
                                <span className="text-success">R$ {total.toFixed(2).replace('.', ',')}</span>
                            </div>
                            <Button variant="success" size="lg" className="w-100 fw-bold" onClick={handleFinalizarCompra} disabled={loading}>
                                {loading ? <Spinner size="sm" animation="border"/> : <><BiCheckCircle className="me-2"/>Confirmar Pedido</>}
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Checkout;