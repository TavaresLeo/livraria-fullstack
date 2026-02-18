import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import ProductCard from '../components/ProductCard';
import Hero from '../components/Hero'; 

const Home = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                // Use a URL do Render
                const response = await fetch('https://minha-api-livraria.onrender.com/api/produtos');
                if (!response.ok) throw new Error('Erro ao buscar produtos');
                const data = await response.json();
                setProducts(data);
            } catch (err) {
                console.error(err);
                setError('Falha ao carregar produtos.');
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    return (
        <>
            <Hero />
            <Container className="py-5">
                <h2 className="mb-4 fw-bold">Destaques da Loja</h2>

                {loading && <div className="text-center"><Spinner animation="border" variant="warning" /></div>}
                {error && <Alert variant="danger">{error}</Alert>}

                <Row>
                    {products.map((item) => (
                        <Col key={item.id || item._id} md={6} lg={3} className="mb-4">
                            {/* Passamos 'item' para a prop 'product' */}
                            <ProductCard product={item} /> 
                        </Col>
                    ))}
                </Row>
            </Container>
        </>
    );
};

export default Home;