import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
// Adicionei o BiCartAdd aqui em cima junto com os outros
import { BiTrash, BiMinus, BiPlus, BiArrowBack, BiCheckCircle, BiCartAdd } from 'react-icons/bi';

const Cart = () => {
    const { cart, removeFromCart, updateQuantity } = useContext(CartContext);

    // Calcula o valor total do pedido
    const totalPedido = cart.reduce((acc, item) => acc + (item.preco * item.quantity), 0);

    // Função auxiliar para imagem
    const getImagemUrl = (caminho) => {
        return caminho.startsWith('http') ? caminho : `/${caminho}`;
    };

    // --- CENÁRIO 1: CARRINHO VAZIO ---
    if (cart.length === 0) {
        return (
            <Container className="py-5 text-center mt-5">
                <div className="mb-4 text-muted">
                    <BiCartAdd size={64} style={{ opacity: 0.5 }} />
                </div>
                <h3>Seu carrinho está vazio</h3>
                <p className="text-muted mb-4">Que tal dar uma olhada nos nossos lançamentos?</p>
                <Link to="/" className="btn btn-warning fw-bold px-4">
                    Voltar para a Loja
                </Link>
            </Container>
        );
    }

    // --- CENÁRIO 2: CARRINHO COM ITENS ---
    return (
        <Container className="py-5 mt-4">
            <h2 className="mb-4 fw-bold">Seu Carrinho</h2>
            
            <Row>
                {/* LISTA DE PRODUTOS (Esquerda) */}
                <Col lg={8}>
                    {cart.map(item => (
                        <Card key={item.id} className="mb-3 shadow-sm border-0">
                            <Card.Body>
                                <Row className="align-items-center">
                                    {/* Imagem */}
                                    <Col xs={4} md={2}>
                                        <img 
                                            src={getImagemUrl(item.imagem)} 
                                            alt={item.titulo} 
                                            className="img-fluid rounded"
                                        />
                                    </Col>

                                    {/* Título e Preço Unitário */}
                                    <Col xs={8} md={4}>
                                        <h5 className="mb-1" style={{ fontSize: '1rem', fontWeight: 'bold' }}>{item.titulo}</h5>
                                        <small className="text-muted">
                                            Unitário: R$ {item.preco.toFixed(2).replace('.', ',')}
                                        </small>
                                    </Col>

                                    {/* Controles de Quantidade */}
                                    <Col xs={6} md={3} className="mt-3 mt-md-0 d-flex align-items-center">
                                        <Button 
                                            variant="outline-secondary" 
                                            size="sm"
                                            onClick={() => updateQuantity(item.id, -1)}
                                        >
                                            <BiMinus />
                                        </Button>
                                        
                                        <span className="mx-3 fw-bold">{item.quantity}</span>
                                        
                                        <Button 
                                            variant="outline-secondary" 
                                            size="sm"
                                            onClick={() => updateQuantity(item.id, 1)}
                                        >
                                            <BiPlus />
                                        </Button>
                                    </Col>

                                    {/* Subtotal e Remover */}
                                    <Col xs={6} md={3} className="mt-3 mt-md-0 text-end">
                                        <div className="fw-bold text-success mb-2">
                                            R$ {(item.preco * item.quantity).toFixed(2).replace('.', ',')}
                                        </div>
                                        <Button 
                                            variant="link" 
                                            className="text-danger p-0 text-decoration-none small"
                                            onClick={() => removeFromCart(item.id)}
                                        >
                                            <BiTrash className="me-1"/> Remover
                                        </Button>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    ))}
                    
                    <div className="mt-4">
                        <Link to="/" className="text-decoration-none text-dark">
                            <BiArrowBack className="me-2"/> Continuar Comprando
                        </Link>
                    </div>
                </Col>

                {/* RESUMO DO PEDIDO (Direita) */}
                <Col lg={4} className="mt-4 mt-lg-0">
                    <Card className="shadow-sm border-0 bg-light">
                        <Card.Body>
                            <h4 className="card-title mb-4 fw-bold">Resumo do Pedido</h4>
                            
                            <div className="d-flex justify-content-between mb-2">
                                <span className="text-muted">Subtotal ({cart.length} itens)</span>
                                <span>R$ {totalPedido.toFixed(2).replace('.', ',')}</span>
                            </div>
                            <div className="d-flex justify-content-between mb-4">
                                <span className="text-muted">Frete</span>
                                <span className="text-success fw-bold">Grátis</span>
                            </div>
                            
                            <hr />
                            
                            <div className="d-flex justify-content-between mb-4 fs-5 fw-bold">
                                <span>Total</span>
                                <span>R$ {totalPedido.toFixed(2).replace('.', ',')}</span>
                            </div>

                            {/* ESTE BOTÃO LEVA AO CHECKOUT, MAS SÓ SE CLICAR NELE */}
                            <Link to="/checkout" className="btn btn-success btn-lg w-100 fw-bold d-flex align-items-center justify-content-center">
                                <BiCheckCircle className="me-2"/> Finalizar Compra
                            </Link>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Cart;