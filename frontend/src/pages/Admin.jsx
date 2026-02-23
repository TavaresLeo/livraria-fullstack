import React, { useState, useEffect } from 'react';
import { Container, Table, Spinner, Badge, Alert } from 'react-bootstrap';

const Admin = () => {
    const [pedidos, setPedidos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPedidos = async () => {
            const token = localStorage.getItem('token'); // Pega o crachá do Admin
            
            try {
                const response = await fetch('https://minha-api-livraria.onrender.com/api/orders', {
                    headers: {
                        'Authorization': `Bearer ${token}` // Exibe o crachá para a API
                    }
                });

                if (!response.ok) throw new Error("Falha ao buscar pedidos. Verifique seu login.");
                
                const data = await response.json();
                setPedidos(data);
            } catch (err) {
                console.error("Erro no Admin:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPedidos();
    }, []);

    return (
        <Container className="py-5">
            <h2 className="mb-4 fw-bold">Painel Administrativo ⚙️</h2>
            
            {error && <Alert variant="danger">{error}</Alert>}

            <h4 className="mt-4 mb-3 text-secondary">Últimos Pedidos</h4>
            
            {loading ? (
                <div className="text-center py-5">
                    <Spinner animation="border" variant="primary" />
                </div>
            ) : (
                <div className="bg-white p-4 shadow-sm rounded">
                    <Table striped hover responsive className="align-middle">
                        <thead className="table-dark">
                            <tr>
                                <th>ID do Pedido</th>
                                <th>Data</th>
                                <th>Itens (Livros)</th>
                                <th>Total</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pedidos.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="text-center py-4 text-muted">
                                        Nenhum pedido foi feito ainda.
                                    </td>
                                </tr>
                            ) : (
                                pedidos.map((pedido) => (
                                    <tr key={pedido._id}>
                                        <td className="text-muted small">{pedido._id}</td>
                                        <td>{new Date(pedido.dataCriacao).toLocaleDateString('pt-BR')}</td>
                                        <td>
                                            {/* O populate do backend traz os títulos dos livros aqui */}
                                            {pedido.itens.map((item, index) => (
                                                <div key={index}>
                                                    <strong>{item.quantidade}x</strong> {item.produto?.titulo || 'Livro Excluído do Banco'}
                                                </div>
                                            ))}
                                        </td>
                                        <td className="text-success fw-bold">
                                            R$ {pedido.total.toFixed(2).replace('.', ',')}
                                        </td>
                                        <td>
                                            <Badge bg={pedido.status === 'Pendente' ? 'warning' : 'success'} text="dark">
                                                {pedido.status}
                                            </Badge>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </Table>
                </div>
            )}
        </Container>
    );
};

export default Admin;