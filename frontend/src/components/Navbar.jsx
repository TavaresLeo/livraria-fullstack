import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { BiSearch, BiUserCircle, BiCart } from 'react-icons/bi'; // <--- MUDOU AQUI (BiUserCircle)
import { CartContext } from '../context/CartContext'; // Importa o contexto do carrinho
import './Navbar.css';

const Navbar = () => {
    // Pega o totalItems direto da "nuvem"
    const { totalItems } = useContext(CartContext);

    return (
        <nav className="navbar navbar-expand-lg bg-warning py-3 shadow-sm">
            <div className="container">
                
                <button 
                    className="navbar-toggler bg-light border-0" 
                    type="button" 
                    data-bs-toggle="collapse" 
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav" 
                    aria-expanded="false" 
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/lancamentos">Lançamentos</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/lojas">Nossas Lojas</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/contato">Contato</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/sobre">Sobre</Link></li>
                    </ul>

                    <div className="d-flex flex-column flex-lg-row align-items-lg-center gap-4 ms-lg-5 icons-area">
                        <form className="d-flex" role="search">
                            <input 
                                className="form-control form-control-search me-2" 
                                type="search" 
                                placeholder="O que você procura?" 
                                aria-label="Search" 
                            />
                            <button className="btn btn-outline-dark border-0" type="submit">
                                <BiSearch size={24} />
                            </button>
                        </form>

                        {/* Ícones (Login + Carrinho) */}
                        <div className="d-flex align-items-center gap-4">
                            
                            {/* 1. ÍCONE DE LOGIN (Vem Primeiro) */}
                            {/* O comando correto é Link to="/login" */}
                            <Link to="/login" className="text-dark d-flex align-items-center" title="Fazer Login">
                                {/* Usamos BiUserCircle para o bonequinho */}
                                <BiUserCircle size={28} />
                            </Link>
                            
                            {/* 2. ÍCONE DO CARRINHO (Vem Depois) */}
                            <div className="position-relative d-flex align-items-center">
                                <Link to="/carrinho" className="text-dark" title="Meu Carrinho">
                                    <BiCart size={28} />
                                </Link>
                                
                                {/* Badge (Bolinha vermelha com número) */}
                                {totalItems > 0 && (
                                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{ fontSize: '0.7rem' }}>
                                        {totalItems}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;