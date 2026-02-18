import React, { useState } from 'react';
import { Container, Form, Button, Card, Alert } from 'react-bootstrap';
// Removemos o useNavigate pois vamos usar o window.location para forçar a atualização

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await fetch('https://minha-api-livraria.onrender.com/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (response.ok) {
                // SUCESSO! Guardamos o Token no navegador
                localStorage.setItem('token', data.token);
                
                // MUDANÇA AQUI: Forçamos o recarregamento para a Navbar atualizar
                window.location.href = '/admin'; 
            } else {
                setError(data.message || "Erro no login");
            }
        } catch (err) {
            setError("Erro de conexão com o servidor");
        }
    };

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
            <Card className="shadow p-4" style={{ width: '400px' }}>
                <h3 className="text-center mb-4">Área Restrita 🔒</h3>
                
                {error && <Alert variant="danger">{error}</Alert>}

                <Form onSubmit={handleLogin}>
                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control 
                            type="email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required 
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Senha</Form.Label>
                        <Form.Control 
                            type="password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required 
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit" className="w-100">
                        Entrar
                    </Button>
                </Form>
            </Card>
        </Container>
    );
};

export default Login;