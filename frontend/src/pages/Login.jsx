import React from 'react';
import { Container, Form, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Login = () => {
    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
            <Card style={{ width: '100%', maxWidth: '400px' }} className="shadow-sm border-0">
                <Card.Body className="p-4">
                    <h3 className="text-center mb-4">Bem-vindo</h3>
                    
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Seu email" />
                        </Form.Group>

                        <Form.Group className="mb-4" controlId="formBasicPassword">
                            <Form.Label>Senha</Form.Label>
                            <Form.Control type="password" placeholder="Sua senha" />
                        </Form.Group>

                        <div className="d-grid gap-2">
                            <Button variant="warning" type="submit" className="fw-bold">
                                Entrar
                            </Button>
                        </div>
                    </Form>

                    <div className="text-center mt-3">
                        <small>Não tem conta? <Link to="/cadastro" className="text-primary text-decoration-none">Cadastre-se</Link></small>
                    </div>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default Login;