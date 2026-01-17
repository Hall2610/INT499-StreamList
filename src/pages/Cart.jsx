// src/pages/Cart.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./shop.css";

export default function Cart() {
  const navigate = useNavigate();
  const { items, totalPrice, removeFromCart, updateQuantity, clearCart } =
    useCart();

  return (
    <section className="shop">
      <header className="shop-header">
        <h1>Your Cart</h1>
        <p className="muted">Review items, adjust quantities, or remove products.</p>
      </header>

      {items.length === 0 ? (
        <div className="card">
          <p className="muted">Your cart is empty.</p>
        </div>
      ) : (
        <>
          <div className="cart-list">
            {items.map((item) => (
              <div className="cart-item" key={item.id}>
                <img
                  className="cart-img"
                  src={item.img}
                  alt={item.name || item.service || "Cart Item"}
                />

                <div className="cart-info">
                  <h3 className="cart-title">
                    {item.name || item.service || "Item"}
                  </h3>

                  {item.description ? (
                    <p className="muted">{item.description}</p>
                  ) : null}

                  <p className="muted">Type: {item.type}</p>
                </div>

                <div className="cart-actions">
                  <p className="price">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>

                  <label className="qty">
                    Qty
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
                    />
                  </label>

                  <button
                    className="btn danger"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <div className="card summary-card">
              <h2>Order Summary</h2>

              <div className="summary-row">
                <span>Total</span>
                <strong>${totalPrice.toFixed(2)}</strong>
              </div>

              <button className="btn" onClick={() => navigate("/credit-card")}>
                Checkout
              </button>

              <button className="btn danger" onClick={clearCart}>
                Clear Cart
              </button>
            </div>
          </div>
        </>
      )}
    </section>
  );
}
