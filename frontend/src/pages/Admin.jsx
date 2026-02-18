import React, { useEffect, useState } from 'react';
import { Container, Table, Badge, Button, Spinner } from 'react-bootstrap';
import { BiCheckCircle, BiRefresh } from 'react-icons/bi';

const Admin = () => {
    const [pedidos, setPedidos] = useState([]);
    const [loading, setLoading] = useState(true);

    const carregarPedidos = () => {
        setLoading(true);
        fetch('https://minha-api-livraria.onrender.com/api/pedidos')
            .then(res => res.json())
            .then(data => {
                setPedidos(data);
                setLoading(false);
            })
            .catch(err => console.error("Erro:", err));
    };

    useEffect(() => {
        carregarPedidos();
    }, []);

    // FUNÇÃO QUE ATUALIZA O STATUS
    const marcarComoEnviado = async (id) => {
        if (!window.confirm("Confirmar envio deste pedido?")) return;

        try {
            const response = await fetch(`https://minha-api-livraria.onrender.com/api/pedidos/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: 'Enviado 🚚' })
            });

            if (response.ok) {
                // Atualiza a lista na tela sem precisar dar F5
                setPedidos(pedidos.map(p => 
                    p._id === id ? { ...p, status: 'Enviado 🚚' } : p
                ));
            }
        } catch {
            alert("Erro ao atualizar status");
        }
    };

    if (loading) return <Container className="py-5 text-center"><Spinner animation="border" /></Container>;

    return (
        <Container className="py-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="fw-bold">Painel Administrativo</h2>
                <Button variant="outline-primary" onClick={carregarPedidos}>
                    <BiRefresh size={24}/> Atualizar Lista
                </Button>
            </div>
            
            <Table striped bordered hover responsive className="shadow-sm bg-white align-middle">
                <thead className="bg-dark text-white">
                    <tr>
                        <th>ID</th>
                        <th>Cliente</th>
                        <th>Total</th>
                        <th>Status</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {pedidos.map(pedido => (
                        <tr key={pedido._id}>
                            <td><small className="text-muted">...{pedido._id.slice(-6)}</small></td>
                            <td>
                                <strong>{pedido.cliente.nome}</strong><br/>
                                <small className="text-muted">{pedido.endereco.cidade}</small>
                            </td>
                            <td className="fw-bold text-success">
                                R$ {pedido.total.toFixed(2).replace('.', ',')}
                            </td>
                            <td>
                                <Badge bg={pedido.status.includes('Enviado') ? 'success' : 'warning'} className="p-2">
                                    {pedido.status}
                                </Badge>
                            </td>
                            <td>
                                {pedido.status === 'Pendente' && (
                                    <Button 
                                        variant="outline-success" 
                                        size="sm"
                                        onClick={() => marcarComoEnviado(pedido._id)}
                                    >
                                        <BiCheckCircle className="me-1"/> Despachar
                                    </Button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};

export default Admin;