import { useState, useEffect } from 'react';
import axios from 'axios';
import { useCart } from '../context/CartContext';

const API_URL = 'https://localhost:5001/api';

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const { addToCart } = useCart();

  useEffect(() => {
    axios.get(`${API_URL}/categories`).then(res => setCategories(res.data));
    fetchProducts();
  }, []);

  const fetchProducts = (categoryId = '') => {
    const url = categoryId ? `${API_URL}/products?categoryId=${categoryId}` : `${API_URL}/products`;
    axios.get(url).then(res => setProducts(res.data));
  };

  const handleCategoryChange = (e) => {
    const catId = e.target.value;
    setSelectedCategory(catId);
    fetchProducts(catId);
  };

  return (
    <div>
      <h1>Комплектующие для ПК</h1>
      <div className="mb-3">
        <label>Фильтр по категории: </label>
        <select value={selectedCategory} onChange={handleCategoryChange} className="form-select w-auto d-inline-block ms-2">
          <option value="">Все</option>
          {categories.map(cat => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>
      </div>
      <div className="row">
        {products.map(product => (
          <div key={product.id} className="col-md-4 mb-4">
            <div className="card h-100">
              <img src={product.imageUrl} className="card-img-top" alt={product.name} />
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">{product.description}</p>
                <p className="card-text"><strong>{product.price} ₽</strong></p>
                <button className="btn btn-primary" onClick={() => addToCart(product)}>В корзину</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}