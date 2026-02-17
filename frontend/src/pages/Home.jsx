import React, { useEffect, useState, useContext } from 'react'; // <--- 1. Adicione useContext
import api from '../services/api';
import { CartContext } from '../context/CartContext'; // <--- 2. Importe o Contexto
import { Link } from 'react-router-dom';
import { Container, Row, Col, Spinner, Alert, Button } from 'react-bootstrap';
import { BiCartAdd } from 'react-icons/bi';

const Home = () => {
    const [produtos, setProdutos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [erro, setErro] = useState(null);

    // 3. Pegue a função de adicionar do carrinho
    const { addToCart } = useContext(CartContext);

    useEffect(() => {
        api.get('/produtos')
            .then(response => {
                setProdutos(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Erro:", error);
                setErro("Erro ao carregar produtos.");
                setLoading(false);
            });
    }, []);

    const getImagemUrl = (caminho) => {
        return caminho.startsWith('http') ? caminho : `/${caminho}`;
    };

    return (
        <Container className="py-5 mt-4">
            <h2 className="text-center mb-5 display-5 fw-bold">Destaques da Livraria</h2>

            {loading && <div className="text-center"><Spinner animation="border" variant="warning" /></div>}
            {erro && <Alert variant="danger">{erro}</Alert>}

            {!loading && !erro && (
                <Row>
                    {produtos.map(livro => (
                        <Col key={livro.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
                            <div className="card h-100 shadow-sm border-0 hover-card">
                                
                                {/* Link na Imagem continua levando para Detalhes */}
                                <div className="text-center p-3" style={{ height: '250px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Link to={`/produto/${livro.id}`}>
                                        <img 
                                            src={getImagemUrl(livro.imagem)} 
                                            alt={livro.titulo} 
                                            className="img-fluid" 
                                            style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
                                        />
                                    </Link>
                                </div>

                                <div className="card-body d-flex flex-column">
                                    {/* Link no Título continua levando para Detalhes */}
                                    <h5 className="card-title text-center" style={{ fontSize: '1rem', fontWeight: 'bold' }}>
                                        <Link to={`/produto/${livro.id}`} className="text-decoration-none text-dark">
                                            {livro.titulo}
                                        </Link>
                                    </h5>
                                    
                                    <div className="mt-auto">
                                        <h4 className="text-center text-success fw-bold mb-3">
                                            R$ {livro.preco.toFixed(2).replace('.', ',')}
                                        </h4>
                                        
                                        {/* 4. AQUI ESTÁ A MUDANÇA: Adicionamos o onClick */}
                                        <Button 
                                            variant="warning" 
                                            className="w-100 fw-bold d-flex align-items-center justify-content-center gap-2"
                                            onClick={() => addToCart(livro)} // <--- Adiciona direto!
                                        >
                                            <BiCartAdd size={20}/> Adicionar
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    ))}
                </Row>
            )}
        </Container>
    );
};

export default Home;