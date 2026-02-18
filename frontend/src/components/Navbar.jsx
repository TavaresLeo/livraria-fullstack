import React from 'react';
import { Navbar, Nav, Container, Badge, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { BiCart, BiStore, BiLogOut, BiUserCircle, BiGridAlt } from 'react-icons/bi';

const Navigation = () => {
    const { cart } = useContext(CartContext);
    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
    const navigate = useNavigate();

    // Verifica se o usuário tem o "crachá" (Token)
    const isLogged = !!localStorage.getItem('token');

    // Função de Logout
    const handleLogout = () => {
        localStorage.removeItem('token'); // Rasga o crachá
        window.location.href = '/login';  // Recarrega e vai pro login
    };

    return (
        <Navbar bg="dark" variant="dark" expand="lg" className="py-3 shadow-sm">
            <Container>
                <Navbar.Brand as={Link} to="/" className="fw-bold fs-4 d-flex align-items-center">
                    <BiStore className="me-2 text-warning" size={30}/>
                    Livraria<span className="text-warning">Tech</span>
                </Navbar.Brand>
                
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto align-items-center">
                        <Nav.Link as={Link} to="/" className="me-3">Home</Nav.Link>
                        
                        {/* SE ESTIVER LOGADO: Mostra Admin e Sair */}
                        {isLogged ? (
                            <>
                                <Nav.Link as={Link} to="/admin" className="me-3 text-warning fw-bold">
                                    <BiGridAlt className="me-1"/> Painel
                                </Nav.Link>
                                <Button 
                                    variant="outline-light" 
                                    size="sm" 
                                    onClick={handleLogout}
                                    className="me-3"
                                >
                                    <BiLogOut className="me-1"/> Sair
                                </Button>
                            </>
                        ) : (
                            /* SE NÃO ESTIVER LOGADO: Mostra Entrar */
                            <Nav.Link as={Link} to="/login" className="me-3">
                                <BiUserCircle className="me-1"/> Entrar
                            </Nav.Link>
                        )}

                        <Nav.Link as={Link} to="/carrinho" className="position-relative">
                            <BiCart size={28} />
                            {totalItems > 0 && (
                                <Badge 
                                    bg="warning" 
                                    text="dark" 
                                    pill 
                                    className="position-absolute top-0 start-100 translate-middle"
                                >
                                    {totalItems}
                                </Badge>
                            )}
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Navigation;