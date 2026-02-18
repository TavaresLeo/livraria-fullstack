import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import ProductCard from '../components/ProductCard';
import Hero from '../components/Hero'; // Seu banner
// import api from '../services/api'; // Se usar axios
// Ou fetch direto

const Home = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Buscando dados do Backend
        const fetchProducts = async () => {
            try {
                // Use a URL da sua API no Render
                const response = await fetch('https://minha-api-livraria.onrender.com/api/produtos');
                if (!response.ok) throw new Error('Erro ao buscar produtos');
                const data = await response.json();
                setProducts(data);
            } catch (err) {
                console.error(err);
                setError('Falha ao carregar produtos. Tente novamente mais tarde.');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    return (
        <>
            <Hero /> {/* Banner Principal */}
            <Container className="py-5">
                <h2 className="mb-4 fw-bold">Destaques da Loja</h2>

                {loading && (
                    <div className="text-center py-5">
                        <Spinner animation="border" variant="warning" />
                    </div>
                )}

                {error && <Alert variant="danger">{error}</Alert>}

                <Row>
                    {products.map((item) => (
                        <Col key={item.id || item._id} md={6} lg={3} className="mb-4">
                            {/* O IMPORTANTE ESTÁ AQUI: product={item} */}
                            <ProductCard product={item} />
                        </Col>
                    ))}
                </Row>
            </Container>
        </>
    );
};

export default Home;