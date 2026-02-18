import React, { useContext } from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import { CartContext } from '../context/CartContext';
import { BiCartAdd } from 'react-icons/bi';

const ProductCard = ({ product }) => {
    const { addToCart } = useContext(CartContext);

    return (
        <Card className="h-100 shadow-sm border-0 product-card">
            <div className="position-relative" style={{ height: '250px', overflow: 'hidden' }}>
                 <Card.Img 
                    variant="top" 
                    src={product.imagem} 
                    alt={product.titulo}
                    className="h-100 w-100"
                    style={{ objectFit: 'contain', padding: '1rem' }}
                />
                <Badge bg="warning" text="dark" className="position-absolute top-0 end-0 m-2">
                    Novo
                </Badge>
            </div>
            <Card.Body className="d-flex flex-column">
                <Card.Title className="fw-bold text-truncate">{product.titulo}</Card.Title>
                <Card.Text className="small text-muted mb-4" style={{ height: '40px', overflow: 'hidden' }}>
                    {product.descricao}
                </Card.Text>
                
                <div className="mt-auto d-flex align-items-center justify-content-between">
                    <span className="fs-5 fw-bold text-primary">
                        R$ {parseFloat(product.preco).toFixed(2).replace('.', ',')}
                    </span>
                    <Button 
                        variant="outline-primary" 
                        size="sm" 
                        className="rounded-circle p-2"
                        onClick={() => addToCart(product)}
                    >
                        <BiCartAdd size={20}/>
                    </Button>
                </div>
            </Card.Body>
        </Card>
    );
};

export default ProductCard; // <--- O SEGREDO ESTÁ AQUI (Export Default)