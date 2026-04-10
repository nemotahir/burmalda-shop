import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import { CartProvider } from './context/CartContext';

function App() {
    return (
        <CartProvider>
            <BrowserRouter>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <div className="container">
                        <Link className="navbar-brand" to="/">BURMALDA</Link>
                        <div>
                            <Link className="btn btn-outline-light me-2" to="/cart">Корзина</Link>
                        </div>
                    </div>
                </nav>
                <div className="container mt-4">
                    <Routes>
                        <Route path="/" element={<ProductList />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/checkout" element={<Checkout />} />
                    </Routes>
                </div>
            </BrowserRouter>
        </CartProvider>
    );
}

export default App;