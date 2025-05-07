import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Payment.css';

function Payment() {
  const [formData, setFormData] = useState({
    name: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
  });

  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTimeout(() => {
      setPaymentSuccess(true);
      localStorage.removeItem('cart');
      setTimeout(() => navigate('/'), 3000);
    }, 1500);
  };

  return (
    <div className="payment-bg">
      <div className="money-animation"></div>
      <div className="payment-container animated">
        <h2 className="payment-title">💳 Payment Details</h2>
        {paymentSuccess ? (
          <div className="success-message">
            ✅ Payment Successful! Redirecting to Home...
          </div>
        ) : (
          <form className="payment-form" onSubmit={handleSubmit}>
            <label>
              Full Name
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Card Number
              <input
                type="text"
                name="cardNumber"
                maxLength="16"
                value={formData.cardNumber}
                onChange={handleChange}
                required
              />
            </label>
            <div className="payment-row">
              <label>
                Expiry
                <input
                  type="text"
                  name="expiry"
                  placeholder="MM/YY"
                  value={formData.expiry}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                CVV
                <input
                  type="password"
                  name="cvv"
                  maxLength="4"
                  value={formData.cvv}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>
            <button type="submit" className="pay-btn">💰 Pay Now</button>
          </form>
        )}
      </div>
    </div>
  );
}

export default Payment;
