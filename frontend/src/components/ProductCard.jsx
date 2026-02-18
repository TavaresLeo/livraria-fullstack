import React, { useContext } from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import { CartContext } from '../context/CartContext';
import { BiCartAdd } from 'react-icons/bi';
import { Link } from 'react-router-dom';

// Recebemos 'product' (singular) como propriedade
const ProductCard = ({ product }) => { 
    const { addToCart } = useContext(CartContext);

    // Proteção: Se o produto vier vazio, não mostra nada (evita tela branca)
    if (!product) return null;

    const getImagemUrl = (caminho) => {
        if (!caminho) return 'https://via.placeholder.com/150';
        return caminho.startsWith('http') ? caminho : `/${caminho}`;
    };

    return (
        <Card className="h-100 shadow-sm border-0 hover-card">
            <div className="position-relative">
                <Card.Img 
                    variant="top" 
                    src={getImagemUrl(product.imagem)} 
                    style={{ height: '250px', objectFit: 'cover' }}
                />
                <Badge bg="warning" text="dark" className="position-absolute top-0 end-0 m-2">
                    Novo
                </Badge>
            </div>
            
            <Card.Body className="d-flex flex-column">
                <Card.Title className="fw-bold">{product.titulo}</Card.Title>
                <Card.Text className="text-muted small flex-grow-1">
                    {product.descricao ? product.descricao.substring(0, 80) + '...' : 'Sem descrição'}
                </Card.Text>
                
                <h4 className="mb-3 text-success fw-bold">
                    R$ {product.preco ? product.preco.toFixed(2).replace('.', ',') : '0,00'}
                </h4>

                <div className="d-flex gap-2">
                    <Link to={`/produto/${product.id || product._id}`} className="btn btn-outline-secondary w-50">
                        Detalhes
                    </Link>
                    
                    {/* A CORREÇÃO ESTÁ AQUI 👇 (A setinha é obrigatória) */}
                    <Button 
                        variant="warning" 
                        className="w-50 fw-bold"
                        onClick={() => addToCart(product)} 
                    >
                        <BiCartAdd size={20}/> Comprar
                    </Button>
                </div>
            </Card.Body>
        </Card>
    );
};

export default ProductCard;