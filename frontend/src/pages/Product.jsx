import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom'; // useParams pega o ID da URL
import api from '../services/api';
import { CartContext } from '../context/CartContext'; // <-- Importa o contexto do carrinho
import { Container, Row, Col, Button, Spinner, Alert } from 'react-bootstrap';
import { BiCartAdd, BiArrowBack } from 'react-icons/bi';

const Product = () => {
    const { id } = useParams(); // Se a URL for /produto/5, id será 5
    const [livro, setLivro] = useState(null);
    const [loading, setLoading] = useState(true);
    const [erro, setErro] = useState(null);

    const { addToCart } = useContext(CartContext); // Pega a função de adicionar ao carrinho do contexto

    useEffect(() => {
        // Busca o livro específico no Backend
        api.get(`/produtos/${id}`)
            .then(response => {
                setLivro(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Erro:", error);
                setErro("Livro não encontrado ou erro de conexão.");
                setLoading(false);
            });
    }, [id]);

    // Função auxiliar de imagem (igual a da Home)
    const getImagemUrl = (caminho) => {
        return caminho.startsWith('http') ? caminho : `/${caminho}`;
    };

    if (loading) return <Container className="py-5 text-center"><Spinner animation="border" variant="warning" /></Container>;
    if (erro) return <Container className="py-5 text-center"><Alert variant="danger">{erro}</Alert><Link to="/" className="btn btn-outline-dark">Voltar</Link></Container>;

    return (
        <Container className="py-5 mt-4">
            <Link to="/" className="btn btn-outline-secondary mb-4">
                <BiArrowBack className="me-2"/> Voltar
            </Link>

            <Row className="align-items-center">
                {/* Coluna da Imagem */}
                <Col md={6} className="text-center mb-4 mb-md-0">
                    <div className="p-4 border rounded bg-light shadow-sm d-inline-block">
                        <img 
                            src={getImagemUrl(livro.imagem)} 
                            alt={livro.titulo} 
                            className="img-fluid" 
                            style={{ maxHeight: '450px' }} 
                        />
                    </div>
                </Col>

                {/* Coluna das Informações */}
                <Col md={6}>
                    <h6 className="text-uppercase text-muted tracking-wide">Livro Físico</h6>
                    <h1 className="display-5 fw-bold mb-3">{livro.titulo}</h1>
                    
                    <div className="mb-4">
                        <span className="fs-1 fw-bold text-success">
                            R$ {livro.preco.toFixed(2).replace('.', ',')}
                        </span>
                        <span className="text-muted ms-2 d-block">em até 3x sem juros</span>
                    </div>

                    <p className="lead mb-4 text-secondary">
                        {livro.descricao}
                    </p>

                    <div className="d-grid gap-3 d-md-flex">
                        <Button variant="warning" size="lg" className="px-5 fw-bold d-flex align-items-center justify-content-center gap-2"
                        onClick= {() => addToCart(livro)}>
                            <BiCartAdd size={24}/> Adicionar ao Carrinho
                        </Button>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default Product;