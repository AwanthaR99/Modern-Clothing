import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Home.css';
import { useLocation } from 'react-router-dom';

function Home({ onAddToCart }) {
  const [products, setProducts] = useState([]);
  const [selected, setSelected] = useState('men');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();

  const categoryMap = {
    men: ['mens-shirts', 'mens-shoes'],
    women: ['womens-dresses', 'womens-shoes'],
    accessories: ['womens-jewellery', 'sunglasses', 'watches'],
  };

  const fetchProducts = async (selectedCategory) => {
    setLoading(true);
    setError(null);
    try {
      const categories = categoryMap[selectedCategory] || [];
      const all = await Promise.all(
        categories.map(cat =>
          axios.get(`https://dummyjson.com/products/category/${cat}`)
        )
      );
      const combined = all.flatMap(res => res.data.products);
      setProducts(combined);
    } catch (err) {
      setError('Failed to load products. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(selected); // Fetch products based on selected category
  }, [selected]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="home">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={handleSearch}
          className="search-input"
        />
      </div>
      <div className="category-buttons">
        <button onClick={() => setSelected('men')}>Men's Clothing</button>
        <button onClick={() => setSelected('women')}>Women's Clothing</button>
        <button onClick={() => setSelected('accessories')}>Accessories</button>
      </div>
      <div className="product-grid">
        {loading && <div className="loading">Loading...</div>}
        {error && <div className="error">{error}</div>}
        {filteredProducts.map((item) => (
          <div key={item.id} className="product-card">
            <img src={item.thumbnail} alt={item.title} className="product-image" />
            <div className="product-name">{item.title}</div>
            <div className="product-price">${item.price}</div>
            <button className="add-to-cart-btn" onClick={() => onAddToCart(item)}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
