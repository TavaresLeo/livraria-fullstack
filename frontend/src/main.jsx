import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
// 1. IMPORTANTE: Importar o Provider
import { CartProvider } from './context/CartContext'; 

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* 2. IMPORTANTE: Envolver o App com o Provider */}
    <CartProvider>
        <App />
    </CartProvider>
  </React.StrictMode>,
)