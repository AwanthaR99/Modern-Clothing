// src/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header({ cartCount }) {
  return (
    <header className="header">
      <div className="logo">
        <span role="img" aria-label="logo">🛍️</span>
        <h1>Modern <span>Clothing</span></h1>
      </div>
      <nav className="nav">
        <Link to="/">Home</Link>
        <Link to="/">Shop</Link>
        <Link to="/payment">Payments</Link>
        <Link to="/about">About Us</Link> {/* ✅ FIXED */}
        <Link to="/cart">🛒 Cart ({cartCount})</Link>
      </nav>
    </header>
  );
}

export default Header;
