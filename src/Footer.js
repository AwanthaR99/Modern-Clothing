import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; {new Date().getFullYear()} Modern Clothing. All rights reserved.</p>
        <div className="footer-links">
          
          <a href="/about">About Us</a>
          <a href="/payment">Payments</a>
          <a href="/cart">Cart</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
