import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import ProductCard from '../components/ProductCard'; // <--- AGORA SEM CHAVES (Padrão)
import Hero from '../components/Hero';

const Home = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('http://localhost:3000/api/produtos')
            .then(res => {
                if (!res.ok) throw new Error('Erro ao buscar produtos');
                return res.json();
            })
            .then(data => {
                setProducts(data);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    return (
        <>
            <Hero />

            <Container id="produtos" className="mb-5">
                <h2 className="mb-4 fw-bold text-center border-bottom pb-2">Destaques da Semana</h2>
                
                {loading && <div className="text-center py-5"><Spinner animation="border" variant="primary" /></div>}
                {error && <Alert variant="danger">{error}</Alert>}

                <Row>
                    {products.map(product => (
                        <Col key={product.id} md={3} className="mb-4">
                            <ProductCard product={product} />
                        </Col>
                    ))}
                </Row>
            </Container>
        </>
    );
};

export default Home;