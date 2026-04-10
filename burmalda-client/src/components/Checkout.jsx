import { useState } from 'react';
import { useCart } from '../context/CartContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_URL = 'https://localhost:5001/api';

export default function Checkout() {
  const { cartItems, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    customerName: '', customerEmail: '', customerPhone: '', deliveryAddress: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const orderData = {
      ...form,
      totalAmount: totalPrice,
      items: cartItems.map(item => ({
        productId: item.product.id,
        quantity: item.quantity,
        unitPrice: item.product.price
      }))
    };
    try {
      await axios.post(`${API_URL}/orders`, orderData);
      clearCart();
      alert('Заказ оформлен! Спасибо за покупку.');
      navigate('/');
    } catch (err) {
      alert('Ошибка при оформлении заказа');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Оформление заказа</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Имя</label>
          <input name="customerName" className="form-control" required onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label>Email</label>
          <input name="customerEmail" type="email" className="form-control" required onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label>Телефон</label>
          <input name="customerPhone" className="form-control" required onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label>Адрес доставки</label>
          <textarea name="deliveryAddress" className="form-control" required onChange={handleChange}></textarea>
        </div>
        <div className="mb-3">
          <strong>Итого к оплате: {totalPrice} ₽</strong>
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Отправка...' : 'Подтвердить заказ'}
        </button>
      </form>
    </div>
  );
}