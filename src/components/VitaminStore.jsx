import { useState } from "react";
import "./VitaminStore.css";

export default function VitaminStore() {
  // Sample products
  const sampleProducts = [
    {
      id: 1,
      name: "Multivitamin Gummies",
      description: "A daily essential vitamin for overall health.",
      price: 12.99,

    },
    {
      id: 2,
      name: "Vitamin C Booster",
      description: "Supports immune system and skin health.",
      price: 8.99,

    },
    {
      id: 3,
      name: "Omega-3 Fish Oil",
      description: "Promotes heart and brain health.",
      price: 15.99,
 
    }
  ];

  const [products] = useState(sampleProducts);
  const [cart, setCart] = useState([]);

  // Add to cart function
  const addToCart = (product) => {
    const existingItem = cart.find((item) => item.id === product.id);
    if (existingItem) {
      setCart(cart.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  // Remove from cart function
  const removeFromCart = (productId) => {
    setCart(cart.filter((item) => item.id !== productId));
  };

  return (
    <div className="vitamin-store">
      <h2>Vitamin & Supplement Marketplace</h2>
      <p>Shop the best vitamins tailored to your health needs.</p>

      {/* Product List */}
      <div className="product-list">
        {products.map((product) => (
          <div key={product.id} className="product-card">

            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p className="price">${product.price.toFixed(2)}</p>
            <button onClick={() => addToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </div>

      {/* Shopping Cart */}
      <h3>🛒 Shopping Cart</h3>
      {cart.length > 0 ? (
        <div className="cart">
          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <span>{item.name} x {item.quantity}</span>
              <button onClick={() => removeFromCart(item.id)}>Remove</button>
            </div>
          ))}
        </div>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
}
