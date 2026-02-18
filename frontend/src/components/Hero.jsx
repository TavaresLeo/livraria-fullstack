import React from 'react';
import { Container, Button } from 'react-bootstrap';

const Hero = () => {
    return (
        <div 
            className="text-center text-white d-flex align-items-center justify-content-center"
            style={{
                // Imagem de fundo (Biblioteca escura e elegante)
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '450px', // Altura do Banner
                marginBottom: '50px'
            }}
        >
            <Container>
                <h1 className="display-3 fw-bold mb-3">Sua Próxima Aventura 📚</h1>
                <p className="lead mb-4 fs-4">
                    Descubra mundos incríveis e histórias inesquecíveis.<br/> 
                    Os melhores livros com entrega para todo o Brasil.
                </p>
                <Button 
                    variant="warning" 
                    size="lg" 
                    className="fw-bold px-5 rounded-pill shadow"
                    href="#produtos" // Link para descer a página suavemente
                >
                    VER OFERTAS
                </Button>
            </Container>
        </div>
    );
};

export default Hero;
