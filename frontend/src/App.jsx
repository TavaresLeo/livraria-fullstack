import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer'; // <--- Importe aqui
import Home from './pages/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import Product from './pages/Product';
import Cart from './pages/Cart'; // <--- Importe a página do carrinho 
import Login from './pages/Login';
import Checkout from './pages/Checkout';  
import Admin from './pages/Admin';  // <--- Importe a página de administração

function App() {
  return (
    <BrowserRouter>
    {/* ... Navbar ...*/}
      <div className="d-flex flex-column min-vh-100">
        <Navbar />
        <div className="flex-grow-1">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/produto/:id" element={<Product />} />
                <Route path="/carrinho" element={<Cart />} />
                <Route path="/login" element={<Login />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/admin" element={<Admin />} />

                <Route path="*" element={<h1 className="text-center mt-5">Página não encontrada</h1>} />
            </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
