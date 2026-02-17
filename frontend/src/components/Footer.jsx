import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { BiEnvelope, BiPhone } from 'react-icons/bi';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer-custom pt-5 pb-4 mt-auto">
            <Container>
                <Row>
                    {/* Coluna 1 */}
                    <Col md={4} className="text-center text-md-start mb-4">
                        <b>Atendimento</b>
                        <Link to="/politica" className="footer-link">Política de Vendas</Link>
                        <Link to="/termos" className="footer-link">Termos e Condições</Link>
                        <Link to="/contato" className="footer-link">Fale Conosco</Link>
                    </Col>

                    {/* Coluna 2 */}
                    <Col md={4} className="text-center mb-4">
                        <b>Institucional</b>
                        <Link to="/sobre" className="footer-link">Sobre a Livraria</Link>
                        <Link to="/lojas" className="footer-link">Nossas Lojas</Link>
                        <Link to="/trabalhe" className="footer-link">Trabalhe Conosco</Link>
                    </Col>

                    {/* Coluna 3 */}
                    <Col md={4} className="text-center text-md-end">
                        <b>Contato</b>
                        <Link to="/contato" className="footer-link mb-2">Formulário do Site</Link>
                        
                        <div className="mb-2">
                            <a href="mailto:email@dominio.com" className="footer-link text-decoration-none p-0">
                                <BiEnvelope className="me-2" /> email@dominio.com
                            </a>
                        </div>
                        <div>
                            <a href="tel:+5528999990000" className="footer-link text-decoration-none p-0">
                                <BiPhone className="me-2" /> (28) 99999-0000
                            </a>
                        </div>
                    </Col>
                </Row>

                <div className="row mt-4">
                    <div className="col-12">
                        <div className="footer-divider pt-3 text-center">
                            <small>&copy; 2025 Livraria. Todos os direitos reservados.</small>
                        </div>
                    </div>
                </div>
            </Container>
        </footer>
    );
};

export default Footer;