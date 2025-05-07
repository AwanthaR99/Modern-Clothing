import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Cart.css';

function Cart({ cartItems, updateQuantity, removeFromCart }) {
  const navigate = useNavigate();

  const getTotal = () => {
    return cartItems
      .reduce((sum, item) => sum + item.price * item.quantity, 0)
      .toFixed(2);
  };

  return (
    <div className="cart-container">
      <h2 className="cart-heading">🛒 Your Cart</h2>
      {cartItems.length === 0 ? (
        <p className="cart-empty">Your cart is empty.</p>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map((item, index) => (
              <div key={item.id} className="cart-item">
              <img src={item.thumbnail} alt={item.title} className="cart-image" />
                <div className="cart-details">
                  <h3>{item.name}</h3>
                  <p className="cart-price">Price: ${item.price}</p>
                  <div className="cart-quantity">
                    <button
                      onClick={() => updateQuantity(index, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(index, item.quantity + 1)}>
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => removeFromCart(index)}
                    className="remove-btn"
                  >
                    ❌ Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <h3 className="cart-total">Total: ${getTotal()}</h3>
          <button className="pay-btn" onClick={() => navigate('/payment')}>
            💳 Proceed to Payment
          </button>
        </>
      )}
    </div>
  );
}

export default Cart;
