import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity, totalPrice } = useCart();

  if (cartItems.length === 0) {
    return <h2>Корзина пуста. <Link to="/">Вернуться к покупкам</Link></h2>;
  }

  return (
    <div>
      <h2>Корзина</h2>
      <table className="table">
        <thead>
          <tr><th>Товар</th><th>Цена</th><th>Кол-во</th><th>Сумма</th><th></th></tr>
        </thead>
        <tbody>
          {cartItems.map(item => (
            <tr key={item.product.id}>
              <td>{item.product.name}</td>
              <td>{item.product.price} ₽</td>
              <td>
                <input type="number" min="1" value={item.quantity}
                  onChange={(e) => updateQuantity(item.product.id, parseInt(e.target.value))}
                  className="form-control w-50" />
              </td>
              <td>{item.product.price * item.quantity} ₽</td>
              <td><button className="btn btn-danger btn-sm" onClick={() => removeFromCart(item.product.id)}>Удалить</button></td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr><td colSpan="3" className="text-end"><strong>Итого:</strong></td><td><strong>{totalPrice} ₽</strong></td><td></td></tr>
        </tfoot>
      </table>
      <Link to="/checkout" className="btn btn-success">Оформить заказ</Link>
    </div>
  );
}