import React, { useState, useContext } from 'react';
import { Container, Row, Col, Form, Button, Card, Spinner } from 'react-bootstrap';
import { CartContext } from '../context/CartContext';
import { BiCheckCircle, BiMap, BiUser, BiCreditCard } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const Checkout = () => {
    const { cart, clearCart } = useContext(CartContext);
    const navigate = useNavigate();

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');

    const [cep, setCep] = useState('');
    const [numero, setNumero] = useState('');
    const [endereco, setEndereco] = useState({
        rua: '',
        bairro: '',
        cidade: '',
        estado: '',
    });

    const [formaPagamento, setFormaPagamento] = useState('boleto');
    const [bandeiraCartao, setBandeiraCartao] = useState('');
    const [ultimos4Digitos, setUltimos4Digitos] = useState('');

    const [loadingCep, setLoadingCep] = useState(false);
    const [erro, setErro] = useState(null);
    const [enviandoPedido, setEnviandoPedido] = useState(false);

    const totalPedido = cart.reduce((acc, item) => acc + (item.preco * item.quantity), 0);

    const buscarCep = async () => {
        const cepLimpo = cep.replace(/\D/g, '');

        if (cepLimpo.length !== 8) return;

        setLoadingCep(true);
        setErro(null);

        try {
            const resposta = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
            const dados = await resposta.json();

            if (dados.erro) {
                setErro('CEP não encontrado.');
                return;
            }

            setEndereco({
                rua: dados.logradouro,
                bairro: dados.bairro,
                cidade: dados.localidade,
                estado: dados.uf,
            });
        } catch {
            setErro('Erro ao buscar CEP.');
        } finally {
            setLoadingCep(false);
        }
    };

    const finalizarCompra = async (e) => {
        e.preventDefault();

        if (cart.length === 0) {
            alert('Seu carrinho está vazio.');
            return;
        }

        const pagamentoComCartao = formaPagamento === 'credito' || formaPagamento === 'debito';

        if (pagamentoComCartao && (!bandeiraCartao || ultimos4Digitos.length !== 4)) {
            alert('Preencha os dados do cartão corretamente.');
            return;
        }

        setEnviandoPedido(true);

        const pagamento = {
            metodo: formaPagamento,
            bandeira: pagamentoComCartao ? bandeiraCartao : undefined,
            ultimos4: pagamentoComCartao ? ultimos4Digitos : undefined,
        };

        const pedido = {
            cliente: { nome, email },
            endereco: {
                rua: endereco.rua,
                numero,
                bairro: endereco.bairro,
                cidade: endereco.cidade,
                estado: endereco.estado,
                cep,
            },
            itens: cart
                .map((item) => {
                    const produtoId = item.id ?? item._id ?? item.cartItemId;

                    if (!produtoId) return null;

                    return {
                        produtoId,
                        titulo: item.titulo,
                        quantidade: item.quantity,
                        precoUnitario: item.preco,
                    };
                })
                .filter(Boolean),
            total: totalPedido,
            pagamento,
        };

        if (pedido.itens.length === 0) {
            setEnviandoPedido(false);
            alert('Nenhum item válido no carrinho para finalizar o pedido.');
            return;
        }

        try {
            const response = await api.post('/pedidos', pedido);

            alert(`Sucesso! Pedido realizado. ID: ${response.data.orderId}`);
            clearCart();
            navigate('/admin');
        } catch (error) {
            const backendMessage = error.response?.data?.details || error.response?.data?.message;
            const fallbackMessage = 'Erro ao salvar pedido. Tente novamente.';
            alert(backendMessage ? `${fallbackMessage}\nDetalhe: ${backendMessage}` : fallbackMessage);
            console.error('Erro ao salvar pedido:', error);
        } finally {
            setEnviandoPedido(false);
        }
    };

    return (
        <Container className="py-5 mt-4">
            <h2 className="mb-4 fw-bold">Finalizar Compra</h2>

            <Row>
                <Col md={8}>
                    <Card className="shadow-sm border-0 mb-4">
                        <Card.Header className="bg-white py-3">
                            <h5 className="mb-0 fw-bold"><BiUser className="me-2" /> Seus Dados</h5>
                        </Card.Header>

                        <Card.Body className="p-4">
                            <Form onSubmit={finalizarCompra}>
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

                                <h5 className="mb-3 fw-bold"><BiMap className="me-2" /> Endereço de Entrega</h5>

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
                                            <Form.Control type="text" value={endereco.rua} readOnly className="bg-light" required />
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
                                            <Form.Control type="text" value={endereco.bairro} readOnly className="bg-light" required />
                                        </Form.Group>
                                    </Col>

                                    <Col md={5}>
                                        <Form.Group controlId="cidade">
                                            <Form.Label>Cidade</Form.Label>
                                            <Form.Control type="text" value={endereco.cidade} readOnly className="bg-light" required />
                                        </Form.Group>
                                    </Col>

                                    <Col md={2}>
                                        <Form.Group controlId="uf">
                                            <Form.Label>UF</Form.Label>
                                            <Form.Control type="text" value={endereco.estado} readOnly className="bg-light" required />
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <hr className="my-4" />

                                <h5 className="mb-3 fw-bold"><BiCreditCard className="me-2" /> Forma de Pagamento</h5>

                                <Form.Group className="mb-3">
                                    <Form.Check
                                        type="radio"
                                        id="pagamento-boleto"
                                        label="Boleto"
                                        name="formaPagamento"
                                        value="boleto"
                                        checked={formaPagamento === 'boleto'}
                                        onChange={(e) => setFormaPagamento(e.target.value)}
                                    />
                                    <Form.Check
                                        type="radio"
                                        id="pagamento-credito"
                                        label="Cartão de Crédito"
                                        name="formaPagamento"
                                        value="credito"
                                        checked={formaPagamento === 'credito'}
                                        onChange={(e) => setFormaPagamento(e.target.value)}
                                    />
                                    <Form.Check
                                        type="radio"
                                        id="pagamento-debito"
                                        label="Cartão de Débito"
                                        name="formaPagamento"
                                        value="debito"
                                        checked={formaPagamento === 'debito'}
                                        onChange={(e) => setFormaPagamento(e.target.value)}
                                    />
                                </Form.Group>

                                {formaPagamento === 'boleto' ? (
                                    <div className="alert alert-warning">
                                        Pagamento por boleto selecionado. O boleto será gerado após confirmar o pedido.
                                    </div>
                                ) : (
                                    <Row className="mb-2">
                                        <Col md={7}>
                                            <Form.Group controlId="bandeiraCartao">
                                                <Form.Label>Bandeira do Cartão</Form.Label>
                                                <Form.Select
                                                    value={bandeiraCartao}
                                                    onChange={(e) => setBandeiraCartao(e.target.value)}
                                                    required={formaPagamento !== 'boleto'}
                                                >
                                                    <option value="">Selecione</option>
                                                    <option value="visa">Visa</option>
                                                    <option value="mastercard">Mastercard</option>
                                                    <option value="elo">Elo</option>
                                                    <option value="hipercard">Hipercard</option>
                                                </Form.Select>
                                            </Form.Group>
                                        </Col>

                                        <Col md={5}>
                                            <Form.Group controlId="ultimos4Digitos">
                                                <Form.Label>Últimos 4 dígitos</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="1234"
                                                    maxLength={4}
                                                    value={ultimos4Digitos}
                                                    onChange={(e) => setUltimos4Digitos(e.target.value.replace(/\D/g, ''))}
                                                    required={formaPagamento !== 'boleto'}
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                )}

                                <Button
                                    variant="success"
                                    size="lg"
                                    type="submit"
                                    className="w-100 mt-3 fw-bold"
                                    disabled={enviandoPedido}
                                >
                                    {enviandoPedido ? 'Criando pedido...' : <><BiCheckCircle className="me-2" /> Confirmar Pedido</>}
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>

                <Col md={4}>
                    <Card className="shadow-sm border-0 bg-light">
                        <Card.Body>
                            <h5 className="mb-3 fw-bold">Resumo do Pedido</h5>
                            {cart.map((item) => (
                                <div key={item.cartItemId ?? item.id ?? item._id} className="d-flex justify-content-between mb-2 small text-muted">
                                    <span>{item.quantity}x {item.titulo}</span>
                                    <span>R$ {(item.preco * item.quantity).toFixed(2).replace('.', ',')}</span>
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
