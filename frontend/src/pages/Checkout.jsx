import React, { useState, useContext } from 'react';
import { Container, Row, Col, Form, Button, Card, Spinner, Alert } from 'react-bootstrap';
import { CartContext } from '../context/CartContext';
import { BiCheckCircle, BiMap, BiUser } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
    const { cart, clearCart } = useContext(CartContext);
    const navigate = useNavigate();
    
    // Estados do Cliente
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');

    // Estados do Endereço
    const [cep, setCep] = useState('');
    const [numero, setNumero] = useState(''); // Estado novo para o número
    const [endereco, setEndereco] = useState({
        rua: '',
        bairro: '',
        cidade: '',
        estado: ''
    });
    
    const [loadingCep, setLoadingCep] = useState(false);
    const [erro, setErro] = useState(null);
    const [enviandoPedido, setEnviandoPedido] = useState(false); // Estado para loading do botão

    // Calcula total
    const totalPedido = cart.reduce((acc, item) => acc + (item.preco * item.quantity), 0);

    // Busca o CEP
    const buscarCep = async () => {
        const cepLimpo = cep.replace(/\D/g, '');

        if (cepLimpo.length !== 8) return;

        setLoadingCep(true);
        setErro(null);

        try {
            const resposta = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
            const dados = await resposta.json();

            if (dados.erro) {
                setErro("CEP não encontrado.");
                setLoadingCep(false);
                return;
            }

            setEndereco({
                rua: dados.logradouro,
                bairro: dados.bairro,
                cidade: dados.localidade,
                estado: dados.uf
            });

        // eslint-disable-next-line no-unused-vars
        } catch (error) {
            setErro("Erro ao buscar CEP.");
        } finally {
            setLoadingCep(false);
        }
    };

    // ENVIA O PEDIDO PARA O BACKEND
    const finalizarCompra = async (e) => {
        e.preventDefault();
        setEnviandoPedido(true);

        // 1. Monta o objeto igual ao que o Backend espera (Order.js)
        const pedido = {
            cliente: { nome, email },
            endereco: {
                rua: endereco.rua,
                numero: numero,
                bairro: endereco.bairro,
                cidade: endereco.cidade,
                estado: endereco.estado,
                cep: cep
            },
            itens: cart.map(item => ({
                produtoId: item.id ?? item._id,
                titulo: item.titulo,
                quantidade: item.quantity,
                precoUnitario: item.preco
            })),
            total: totalPedido
        };

        try {
            // 2. Faz o POST para a nossa API
            const response = await fetch('https://minha-api-livraria.onrender.com/api/pedidos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(pedido)
            });

            if (response.ok) {
                const dados = await response.json();
                alert(`Sucesso! Pedido realizado. ID: ${dados.orderId}`);
                clearCart();
                navigate('/');
            } else {
                alert("Erro ao salvar pedido. Tente novamente.");
            }

        } catch (error) {
            console.error("Erro de conexão:", error);
            alert("Erro de conexão com o servidor.");
        } finally {
            setEnviandoPedido(false);
        }
    };

    return (
        <Container className="py-5 mt-4">
            <h2 className="mb-4 fw-bold">Finalizar Compra</h2>

            <Row>
                {/* FORMULÁRIO */}
                <Col md={8}>
                    <Card className="shadow-sm border-0 mb-4">
                        <Card.Header className="bg-white py-3">
                            <h5 className="mb-0 fw-bold"><BiUser className="me-2"/> Seus Dados</h5>
                        </Card.Header>
                        <Card.Body className="p-4">
                            <Form onSubmit={finalizarCompra}>
                                
                                {/* DADOS PESSOAIS */}
                                <Row className="mb-3">
                                    <Col md={6}>
                                        <Form.Group controlId="nome">
                                            <Form.Label>Nome Completo</Form.Label>
                                            <Form.Control 
                                                type="text" 
                                                placeholder="Ex: João da Silva" 
                                                value={nome}
                                                onChange={(e) => setNome(e.target.value)}
                                                required 
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group controlId="email">
                                            <Form.Label>Email (Opcional)</Form.Label>
                                            <Form.Control 
                                                type="email" 
                                                placeholder="joao@email.com"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <hr className="my-4" />
                                
                                <h5 className="mb-3 fw-bold"><BiMap className="me-2"/> Endereço de Entrega</h5>

                                {/* ENDEREÇO */}
                                <Row className="mb-3">
                                    <Col md={4}>
                                        <Form.Group controlId="cep">
                                            <Form.Label>CEP</Form.Label>
                                            <Form.Control 
                                                type="text" 
                                                placeholder="00000-000"
                                                value={cep}
                                                onChange={(e) => setCep(e.target.value)}
                                                onBlur={buscarCep}
                                                maxLength={9}
                                                required
                                            />
                                            {loadingCep && <Spinner animation="border" size="sm" className="mt-2 text-warning" />}
                                            {erro && <small className="text-danger d-block mt-1">{erro}</small>}
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Row className="mb-3">
                                    <Col md={9}>
                                        <Form.Group controlId="rua">
                                            <Form.Label>Rua / Avenida</Form.Label>
                                            <Form.Control type="text" value={endereco.rua} readOnly className="bg-light" />
                                        </Form.Group>
                                    </Col>
                                    <Col md={3}>
                                        <Form.Group controlId="numero">
                                            <Form.Label>Número</Form.Label>
                                            <Form.Control 
                                                type="text" 
                                                value={numero}
                                                onChange={(e) => setNumero(e.target.value)}
                                                required 
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Row className="mb-3">
                                    <Col md={5}>
                                        <Form.Group controlId="bairro">
                                            <Form.Label>Bairro</Form.Label>
                                            <Form.Control type="text" value={endereco.bairro} readOnly className="bg-light" />
                                        </Form.Group>
                                    </Col>
                                    <Col md={5}>
                                        <Form.Group controlId="cidade">
                                            <Form.Label>Cidade</Form.Label>
                                            <Form.Control type="text" value={endereco.cidade} readOnly className="bg-light" />
                                        </Form.Group>
                                    </Col>
                                    <Col md={2}>
                                        <Form.Group controlId="uf">
                                            <Form.Label>UF</Form.Label>
                                            <Form.Control type="text" value={endereco.estado} readOnly className="bg-light" />
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Button 
                                    variant="success" 
                                    size="lg" 
                                    type="submit" 
                                    className="w-100 mt-3 fw-bold"
                                    disabled={enviandoPedido}
                                >
                                    {enviandoPedido ? (
                                        <>Creating Order...</>
                                    ) : (
                                        <><BiCheckCircle className="me-2"/> Confirmar Pedido</>
                                    )}
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>

                {/* RESUMO (Direita) */}
                <Col md={4}>
                    <Card className="shadow-sm border-0 bg-light">
                        <Card.Body>
                            <h5 className="mb-3 fw-bold">Resumo do Pedido</h5>
                            {cart.map(item => (
                                <div key={item.id} className="d-flex justify-content-between mb-2 small text-muted">
                                    <span>{item.quantity}x {item.titulo}</span>
                                    <span>R$ {(item.preco * item.quantity).toFixed(2)}</span>
                                </div>
                            ))}
                            <hr />
                            <div className="d-flex justify-content-between fs-5 fw-bold text-dark">
                                <span>Total</span>
                                <span>R$ {totalPedido.toFixed(2).replace('.', ',')}</span>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Checkout;